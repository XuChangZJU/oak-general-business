"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCheckers = void 0;
const relation_1 = require("oak-domain/lib/store/relation");
const types_1 = require("oak-domain/lib/types");
const filter_1 = require("oak-domain/lib/store/filter");
const checkers = [
    {
        type: 'row',
        action: 'remove',
        entity: 'user',
        filter: {
            userState: 'shadow',
        }
    },
    {
        type: 'logical',
        action: ['remove', 'disable', 'enable'],
        entity: 'user',
        checker: (operation, context) => {
            // 只有root才能进行操作
            if (!context.isRoot()) {
                throw new types_1.OakUserUnpermittedException('user', { id: 'disable', action: 'disable', data: {} });
            }
        }
    },
    {
        type: 'data',
        action: 'grant',
        entity: 'user',
        checker: (data) => {
            if (Object.keys(data).filter(ele => !ele.includes('$')).length > 0) {
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
];
exports.default = checkers;
exports.UserCheckers = [
    {
        entity: 'user',
        action: 'update',
        type: 'logical',
        checker: (operation, context) => {
            // 在大部分应用中，除了root，其他人不应该有权利更新其他人信息，但是shadow用户应当除外
            // 但这些条件不一定对所有的应用都成立，应用如果有更复杂的用户相互更新策略，就不要引入这个checker
            // 这也是个例子，如何对user这样的特殊对象进行权限控制
            const userId = context.getCurrentUserId();
            if (context.isRoot()) {
                return;
            }
            const { filter, data } = operation;
            for (const attr in data) {
                const rel = (0, relation_1.judgeRelation)(context.getSchema(), 'user', attr);
                if (rel !== 1) {
                    throw new types_1.OakUserUnpermittedException('user', operation, '您不能更新他人信息');
                }
            }
            const result = (0, filter_1.checkFilterContains)('user', context, {
                id: userId,
            }, filter, true);
            if (result instanceof Promise) {
                return result.then((r) => {
                    if (!r) {
                        throw new types_1.OakUserUnpermittedException('user', operation, '您不能更新他人信息');
                    }
                });
            }
            if (!result) {
                throw new types_1.OakUserUnpermittedException('user', operation, '您不能更新他人信息');
            }
        },
    }
];
