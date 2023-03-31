"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteOperation = exports.rewriteSelection = void 0;
var tslib_1 = require("tslib");
var relation_1 = require("oak-domain/lib/store/relation");
var types_1 = require("oak-domain/lib/types");
var assert_1 = tslib_1.__importDefault(require("assert"));
function rewriteFilter(schema, entity, filter) {
    var e_1, _a, _b, _c, _d, _e;
    var _f;
    for (var attr in filter) {
        if (attr === '#id' || attr === '$text' || attr.toLowerCase().startsWith(types_1.EXPRESSION_PREFIX)) {
        }
        else if (['$and', '$or'].includes(attr)) {
            try {
                for (var _g = (e_1 = void 0, tslib_1.__values(filter[attr])), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var node = _h.value;
                    rewriteFilter(schema, entity, node);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else if (attr === '$not') {
            rewriteFilter(schema, entity, filter[attr]);
        }
        else {
            /**
             * 这里要处理的就是把userId受到的约束扩展到存在merge的case
             * 大部分这类约束都来自relation类型的checker（auth）。来自auth的由系统创建的checker一定是{ userId: xxx }的形式，但用户手写的有可能是{ user: { id: xxxx }}的形式
             */
            if (attr.endsWith('Id') && attr !== 'entityId' && ((_f = schema[entity].attributes[attr]) === null || _f === void 0 ? void 0 : _f.type) === 'ref') {
                // 只要是指向user的ref都要处理
                var rel = (0, relation_1.judgeRelation)(schema, entity, attr.slice(0, attr.length - 2));
                if (rel === 'user') {
                    var f = filter[attr];
                    delete filter[attr];
                    if (filter.$or) {
                        filter.$or.push((_b = {},
                            _b[attr] = f,
                            _b), (_c = {},
                            _c[attr.slice(0, attr.length - 2)] = {
                                userState: 'merged',
                                refId: f,
                            },
                            _c));
                    }
                    else {
                        filter.$or = [
                            (_d = {},
                                _d[attr] = f,
                                _d),
                            (_e = {},
                                _e[attr.slice(0, attr.length - 2)] = {
                                    userState: 'merged',
                                    refId: f,
                                },
                                _e)
                        ];
                    }
                }
            }
            else if (attr === 'entity' && filter[attr] === 'user') {
                (0, assert_1.default)(filter.entityId);
                var f = filter.entityId;
                delete filter.entityId;
                if (filter.$or) {
                    filter.$or.push({
                        entityId: f,
                    }, {
                        user: {
                            userState: 'merged',
                            refId: f,
                        }
                    });
                }
                else {
                    filter.$or = [
                        {
                            entityId: f,
                        },
                        {
                            user: {
                                userState: 'merged',
                                refId: f,
                            }
                        }
                    ];
                }
            }
            else {
                var rel = (0, relation_1.judgeRelation)(schema, entity, attr);
                if (rel === 2) {
                    if (attr === 'user' && filter[attr].id) {
                        throw new Error('不应该出现{user: {id:}}格式的查询');
                    }
                    rewriteFilter(schema, attr, filter[attr]);
                }
                else if (typeof rel === 'string') {
                    if (rel === 'user' && filter[attr].id) {
                        throw new Error('不应该出现{user: {id:}}格式的查询');
                    }
                    rewriteFilter(schema, rel, filter[attr]);
                }
                else if (rel instanceof Array) {
                    var _j = tslib_1.__read(rel, 1), e = _j[0];
                    var f = filter[attr].filter;
                    if (f) {
                        rewriteFilter(schema, e, f);
                    }
                }
                else if (typeof filter[attr] === 'object') {
                    //  还要处理子查询
                    var _k = filter[attr], $in = _k.$in, $nin = _k.$nin;
                    if ($in && !($in instanceof Array)) {
                        var e = $in.entity, f = $in.filter;
                        rewriteFilter(schema, e, f);
                    }
                    if ($nin && !($nin instanceof Array)) {
                        var e = $nin.entity, f = $nin.filter;
                        rewriteFilter(schema, e, f);
                    }
                }
            }
        }
    }
    // { user: { id: xxxxx }} 的查询大都来自cascade查询，只能先不处理
    if (entity === 'user' && filter.id) {
        // throw new Error('不应该出现{user: {id:}}格式的查询');
    }
}
function rewriteSelection(schema, entity, selection) {
    var _a;
    var filter = selection.filter;
    if (filter && !filter['#oak-general-business--rewrited']) {
        rewriteFilter(schema, entity, filter);
        // 避免被重写多次
        Object.assign(filter, (_a = {},
            _a['#oak-general-business--rewrited'] = true,
            _a));
    }
    return;
}
exports.rewriteSelection = rewriteSelection;
function rewriteOperation(schema, entity, operation) {
    var _a;
    var filter = operation.filter;
    if (filter && !filter['#oak-general-business--rewrited']) {
        rewriteFilter(schema, entity, filter);
        // 避免被重写多次
        Object.assign(filter, (_a = {},
            _a['#oak-general-business--rewrited'] = true,
            _a));
    }
    return;
}
exports.rewriteOperation = rewriteOperation;
