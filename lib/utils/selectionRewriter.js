"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteOperation = exports.rewriteSelection = void 0;
var tslib_1 = require("tslib");
var relation_1 = require("oak-domain/lib/store/relation");
var types_1 = require("oak-domain/lib/types");
var assert_1 = tslib_1.__importDefault(require("assert"));
/**
 * 这个修改是不可反复做的，会产生无穷递归
 * 因此只能产生新的filter结构
 * @param schema
 * @param entity
 * @param filter2
 */
function rewriteFilter(schema, entity, filter) {
    var _a, _b, _c, _d, _e, _f, _g;
    var _h;
    var filter2 = {};
    var addOrLogic = function (orLogic) {
        if (!filter2.$or) {
            Object.assign(filter2, {
                $or: orLogic,
            });
        }
        else if (filter2.$and) {
            filter2.$and.push({
                $or: orLogic,
            });
        }
        else {
            Object.assign({
                $and: [
                    {
                        $or: orLogic,
                    }
                ]
            });
        }
    };
    for (var attr in filter) {
        if (attr.startsWith('#') || attr === '$text' || attr.toLowerCase().startsWith(types_1.EXPRESSION_PREFIX)) {
            filter2[attr] = filter[attr];
        }
        else if (['$and', '$or'].includes(attr)) {
            filter2[attr] = filter[attr].map(function (ele) { return rewriteFilter(schema, entity, ele); });
        }
        else if (attr === '$not') {
            Object.assign(filter2, {
                $not: rewriteFilter(schema, entity, filter[attr]),
            });
        }
        else {
            /**
             * 这里要处理的就是把userId受到的约束扩展到存在merge的case
             * 大部分这类约束都来自relation类型的checker（auth）。来自auth的由系统创建的checker一定是{ userId: xxx }的形式，但用户手写的有可能是{ user: { id: xxxx }}的形式
             */
            if (attr.endsWith('Id') && attr !== 'entityId' && ((_h = schema[entity].attributes[attr]) === null || _h === void 0 ? void 0 : _h.type) === 'ref') {
                // 只要是指向user的ref都要处理
                var rel = (0, relation_1.judgeRelation)(schema, entity, attr.slice(0, attr.length - 2));
                if (rel === 'user') {
                    addOrLogic([
                        (_a = {},
                            _a[attr] = filter[attr],
                            _a),
                        (_b = {},
                            _b[attr.slice(0, attr.length - 2)] = {
                                userState: 'merged',
                                refId: filter[attr],
                            },
                            _b)
                    ]);
                }
                else {
                    filter2[attr] = filter[attr];
                }
            }
            else if (attr === 'entity' && filter[attr] === 'user') {
                (0, assert_1.default)(filter.entityId);
                addOrLogic([
                    {
                        entityId: filter.entityId,
                    },
                    {
                        user: {
                            userState: 'merged',
                            refId: filter.entityId,
                        }
                    }
                ]);
            }
            else {
                var rel = (0, relation_1.judgeRelation)(schema, entity, attr);
                if (rel === 2) {
                    var filter3 = rewriteFilter(schema, attr, filter[attr]);
                    if (attr === 'user') {
                        Object.assign(filter2, (_c = {},
                            _c[attr] = {
                                $or: [
                                    filter3,
                                    {
                                        userState: 'merged',
                                        ref: filter3
                                    }
                                ]
                            },
                            _c));
                    }
                    else {
                        Object.assign(filter2, (_d = {},
                            _d[attr] = filter3,
                            _d));
                    }
                }
                else if (typeof rel === 'string') {
                    var filter3 = rewriteFilter(schema, rel, filter[attr]);
                    if (rel === 'user') {
                        Object.assign(filter2, (_e = {},
                            _e[attr] = {
                                $or: [
                                    filter3,
                                    {
                                        userState: 'merged',
                                        ref: filter3
                                    }
                                ]
                            },
                            _e));
                    }
                    else {
                        Object.assign(filter2, (_f = {},
                            _f[attr] = filter3,
                            _f));
                    }
                }
                else if (rel instanceof Array) {
                    var _j = tslib_1.__read(rel, 1), e = _j[0];
                    (0, assert_1.default)(e !== 'user', '会出现一对多user的情况么');
                    Object.assign(filter2, (_g = {},
                        _g[attr] = rewriteFilter(schema, e, filter[attr]),
                        _g));
                }
                else {
                    (0, assert_1.default)(rel === 1);
                    filter2[attr] = filter[attr];
                }
            }
        }
    }
    return filter2;
}
function rewriteSelection(schema, entity, selection) {
    var _a;
    var filter = selection.filter, data = selection.data;
    if (filter && !filter['#oak-general-business--rewrited']) {
        var filter2 = rewriteFilter(schema, entity, filter);
        // 避免被重写多次
        Object.assign(filter2, (_a = {},
            _a['#oak-general-business--rewrited'] = true,
            _a));
        selection.filter = filter2;
    }
    // RewriteSelection只在入口处调用一次，因此需要在这里处理一对多的projection
    var rewriteProjection = function (e, d) {
        for (var attr in d) {
            var rel = (0, relation_1.judgeRelation)(schema, e, attr);
            if (rel === 2) {
                rewriteProjection(attr, d[attr]);
            }
            else if (typeof rel === 'string') {
                rewriteProjection(rel, d[attr]);
            }
            else if (typeof rel === 'object' && rel instanceof Array) {
                rewriteSelection(schema, rel[0], d[attr]);
            }
        }
    };
    rewriteProjection(entity, data);
    return;
}
exports.rewriteSelection = rewriteSelection;
function rewriteOperation(schema, entity, operation) {
    var _a;
    var filter = operation.filter;
    if (filter && !filter['#oak-general-business--rewrited']) {
        var filter2 = rewriteFilter(schema, entity, filter);
        // 避免被重写多次
        Object.assign(filter2, (_a = {},
            _a['#oak-general-business--rewrited'] = true,
            _a));
        operation.filter = filter2;
    }
    return;
}
exports.rewriteOperation = rewriteOperation;
