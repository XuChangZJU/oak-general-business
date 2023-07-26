"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rewriteOperation = exports.rewriteSelection = void 0;
var tslib_1 = require("tslib");
var relation_1 = require("oak-domain/lib/store/relation");
var types_1 = require("oak-domain/lib/types");
var assert_1 = tslib_1.__importDefault(require("assert"));
function rewriteFilter(schema, entity, filter) {
    var e_1, _a;
    var _b;
    var addOrLogic = function (orLogic) {
        if (!filter.$or) {
            Object.assign(filter, {
                $or: orLogic,
            });
        }
        else if (filter.$and) {
            filter.$and.push({
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
    var userIdPointers = [];
    var userPointers = [];
    for (var attr in filter) {
        if (attr === '#id' || attr === '$text' || attr.toLowerCase().startsWith(types_1.EXPRESSION_PREFIX)) {
        }
        else if (['$and', '$or'].includes(attr)) {
            try {
                for (var _c = (e_1 = void 0, tslib_1.__values(filter[attr])), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var node = _d.value;
                    rewriteFilter(schema, entity, node);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
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
            if (attr.endsWith('Id') && attr !== 'entityId' && ((_b = schema[entity].attributes[attr]) === null || _b === void 0 ? void 0 : _b.type) === 'ref') {
                // 只要是指向user的ref都要处理
                var rel = (0, relation_1.judgeRelation)(schema, entity, attr.slice(0, attr.length - 2));
                if (rel === 'user') {
                    userIdPointers.push(attr);
                }
            }
            else if (attr === 'entity' && filter[attr] === 'user') {
                (0, assert_1.default)(filter.entityId);
                userIdPointers.push('entityId');
            }
            else {
                var rel = (0, relation_1.judgeRelation)(schema, entity, attr);
                if (rel === 2) {
                    rewriteFilter(schema, attr, filter[attr]);
                    if (attr === 'user') {
                        userPointers.push(attr);
                    }
                }
                else if (typeof rel === 'string') {
                    rewriteFilter(schema, rel, filter[attr]);
                    if (rel === 'user') {
                        userPointers.push(attr);
                    }
                }
                else if (rel instanceof Array) {
                    var _e = tslib_1.__read(rel, 1), e = _e[0];
                    (0, assert_1.default)(e !== 'user', '会出现一对多user的情况么');
                    rewriteFilter(schema, e, filter[attr]);
                }
            }
        }
    }
    userIdPointers.forEach(function (attr) {
        var _a, _b;
        if (attr === 'entityId') {
            var f = filter.entityId;
            delete filter.entityId;
            addOrLogic([
                {
                    entityId: f,
                }, {
                    user: {
                        userState: 'merged',
                        refId: f,
                    }
                }
            ]);
        }
        else {
            var f = filter[attr];
            delete filter[attr];
            addOrLogic([
                (_a = {},
                    _a[attr] = f,
                    _a),
                (_b = {},
                    _b[attr.slice(0, attr.length - 2)] = {
                        userState: 'merged',
                        refId: f,
                    },
                    _b)
            ]);
        }
    });
    userPointers.forEach(function (attr) {
        var _a;
        var f = filter[attr];
        delete filter[attr];
        Object.assign(filter, (_a = {},
            _a[attr] = {
                $or: [
                    f,
                    {
                        userState: 'merged',
                        ref: f
                    }
                ]
            },
            _a));
    });
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
