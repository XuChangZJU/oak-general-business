"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var selection_1 = require("oak-domain/lib/store/selection");
var relation_1 = require("oak-domain/lib/store/relation");
var console_1 = require("console");
function rewriteFilter(schema, entity, filter) {
    var _a, _b, _c, _d;
    for (var attr in filter) {
        /**
         * 这里要处理的就是把userId受到的约束扩展到存在merge的case
         * 大部分这类约束都来自relation类型的checker（auth）。来自auth的由系统创建的checker一定是{ userId: xxx }的形式，但用户手写的有可能是{ user: { id: xxxx }}的形式
         */
        if (attr.endsWith('Id') && attr !== 'entityId') {
            // 只要是指向user的ref都要处理
            var rel = (0, relation_1.judgeRelation)(schema, entity, attr.slice(0, attr.length - 2));
            if (rel === 'user') {
                var f = filter[attr];
                delete filter[attr];
                if (filter.$or) {
                    filter.$or.push((_a = {},
                        _a[attr] = f,
                        _a), (_b = {},
                        _b[attr.slice(0, attr.length - 2)] = {
                            userState: 'merged',
                            refId: f,
                        },
                        _b));
                }
                else {
                    filter.$or = [
                        (_c = {},
                            _c[attr] = f,
                            _c),
                        (_d = {},
                            _d[attr.slice(0, attr.length - 2)] = {
                                userState: 'merged',
                                refId: f,
                            },
                            _d)
                    ];
                }
            }
        }
        else if (attr === 'entity' && filter[attr] === 'user') {
            (0, console_1.assert)(filter.entityId);
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
                rewriteFilter(schema, attr, filter[attr]);
            }
            else if (typeof rel === 'string') {
                rewriteFilter(schema, rel, filter[attr]);
            }
            else if (rel instanceof Array) {
                var _e = tslib_1.__read(rel, 1), e = _e[0];
                var f = filter[attr].filter;
                if (f) {
                    rewriteFilter(schema, e, f);
                }
            }
            else {
                //  还要处理子查询
                var _f = filter[attr], $in = _f.$in, $nin = _f.$nin;
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
    // 先防一手写出{ user: { id: xxxxx }}
    if (entity === 'user' && filter.id) {
        throw new Error('不应该出现{user: {id:}}格式的查询');
    }
}
function rewriteSelection(schema, entity, selection) {
    var filter = selection.filter;
    if (filter) {
        rewriteFilter(schema, entity, filter);
    }
    return;
}
function rewriteOperation(schema, entity, operation) {
    var filter = operation.filter;
    if (filter) {
        rewriteFilter(schema, entity, filter);
    }
    return;
}
var startRoutines = [
    {
        name: '注入对合并的user的selection的改写',
        fn: function (context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                (0, selection_1.registerSelectionRewriter)(rewriteSelection);
                (0, selection_1.registerOperationRewriter)(rewriteOperation);
                return [2 /*return*/, '注入成功'];
            });
        }); },
    }
];
exports.default = startRoutines;
