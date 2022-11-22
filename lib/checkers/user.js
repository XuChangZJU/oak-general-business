"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("oak-domain/lib/types");
var constants_1 = require("../constants");
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
        action: ['play', 'remove', 'disable', 'enable'],
        entity: 'user',
        relationFilter: function (userId) {
            // 只有root才能进行操作
            throw new types_1.OakUserUnpermittedException();
        },
        errMsg: '越权操作',
    },
    {
        type: 'data',
        action: 'play',
        entity: 'user',
        checker: function (data) {
            // 不记得什么意思了
            /* const token = context.getToken();
            const { userId } = token!;
            if (userId === operation.filter!.id) {
                throw new OakRowInconsistencyException();
            } */
        },
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
            id: {
                $nin: {
                    entity: 'userRole',
                    data: {
                        userId: 1,
                    },
                    filter: {
                        roleId: constants_1.ROOT_ROLE_ID,
                    },
                },
            }
        },
        errMsg: '不能禁用root用户',
    }
];
exports.default = checkers;
