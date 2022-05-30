"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("oak-domain/lib/types");
const assert_1 = __importDefault(require("assert"));
const triggers = [
    {
        name: '当创建userEntityGrant时,查询是否有未过期的实体',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (userEntityGrantData) => {
                const { userId } = (await context.getToken());
                (0, assert_1.default)(userId);
                const { action, entity, entityId, relation } = userEntityGrantData;
                const { result } = await context.rowStore.select('userEntityGrant', {
                    data: {
                        id: 1,
                        action: 1,
                        entity: 1,
                        entityId: 1,
                        relation: 1,
                        iState: 1,
                        granterId: 1,
                    },
                    filter: {
                        iState: 'init',
                        action,
                        entity,
                        entityId,
                        granterId: userId,
                        relation,
                    },
                    indexFrom: 0,
                    count: 1,
                }, context, params);
                if (result.length) {
                    throw new types_1.OakCongruentRowExists(result[0], '有可重用的userEntityGrant');
                }
                (0, lodash_1.assign)(userEntityGrantData, {
                    granterId: userId,
                });
            };
            if (data instanceof Array) {
                (0, assert_1.default)('授权不存在一对多的情况');
            }
            else {
                await fn(data);
            }
            return 0;
        }
    },
];
exports.default = triggers;
