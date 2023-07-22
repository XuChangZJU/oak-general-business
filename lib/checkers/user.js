"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var relation_1 = require("oak-domain/lib/store/relation");
var types_1 = require("oak-domain/lib/types");
var checkers = [
    {
        type: 'row',
        action: 'remove',
        entity: 'user',
        filter: {
            userState: 'shadow',
        }
    },
    {
        type: 'relation',
        action: ['remove', 'disable', 'enable'],
        entity: 'user',
        relationFilter: function () {
            // 只有root才能进行操作
            throw new types_1.OakUserUnpermittedException();
        },
        errMsg: '越权操作',
    },
    {
        type: 'data',
        action: 'grant',
        entity: 'user',
        checker: function (data) {
            if (Object.keys(data).filter(function (ele) { return !ele.includes('$'); }).length > 0) {
                throw new types_1.OakInputIllegalException('user', Object.keys(data), '授权不允许传入其它属性');
            }
        }
    },
    {
        type: 'row',
        action: 'disable',
        entity: 'user',
        filter: {
            isRoot: false,
        },
        errMsg: '不能禁用root用户',
    },
    // {
    //     type: 'row',
    //     action: 'select',
    //     entity: 'user',
    //     filter: (operation, context) => {
    //         const systemId = context.getSystemId();
    //         // todo 查询用户 先不加systemId
    //         if (systemId) {
    //             return {
    //                 id: {
    //                     $in: {
    //                         entity: 'userSystem',
    //                         data: {
    //                             userId: 1,
    //                         },
    //                         filter: {
    //                             systemId,
    //                         },
    //                     },
    //                 },
    //             };
    //         }
    //     },
    // },
    {
        entity: 'user',
        action: 'update',
        type: 'relation',
        relationFilter: function (operation, context) {
            var userId = context.getCurrentUserId();
            var data = operation.data;
            for (var attr in data) {
                var rel = (0, relation_1.judgeRelation)(context.getSchema(), 'user', attr);
                if (rel === 1) {
                    return {
                        id: userId,
                    };
                }
            }
            return undefined;
        },
        errMsg: '您不能更新他人信息',
    }
];
exports.default = checkers;
