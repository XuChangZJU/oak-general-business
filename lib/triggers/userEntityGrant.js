"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const types_1 = require("oak-domain/lib/types");
const assert_1 = __importDefault(require("assert"));
const constants_1 = require("../constants");
const wechatQrCode_1 = require("../aspects/wechatQrCode");
const triggers = [
    {
        name: '当创建userEntityGrant时，查询是否有未过期可重用的对象',
        entity: 'userEntityGrant',
        action: 'create',
        when: 'before',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const fn = async (userEntityGrantData) => {
                const { userId } = (await context.getToken());
                const { id: applicationId, config: appConfig, system: { config: SystemConfig } } = (await context.getApplication());
                (0, assert_1.default)(userId);
                const { type, entity, entityId, relation, id } = userEntityGrantData;
                const { result } = await context.rowStore.select('userEntityGrant', {
                    data: {
                        id: 1,
                        type: 1,
                        entity: 1,
                        entityId: 1,
                        relation: 1,
                        expired: 1,
                        granterId: 1,
                    },
                    filter: {
                        expired: false,
                        expiresAt: {
                            $gt: Date.now() - 600 * 1000,
                        },
                        type,
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
                const expiresAt = Date.now() + (SystemConfig.UserEntityGrant?.lifetimeLength || constants_1.DefaultConfig.userEntityGrant.lifetimeLength);
                (0, lodash_1.assign)(userEntityGrantData, {
                    granterId: userId,
                    expiresAt,
                    expired: false,
                });
                // 如果是微信体系的应用，为之创建一个默认的weChatQrCode
                if (['wechatPublic', 'wechatMp'].includes(appConfig.type)) {
                    await (0, wechatQrCode_1.createWechatQrCode)({
                        entity: 'userEntityGrant',
                        entityId: id,
                        applicationId,
                        props: {
                            pathname: 'pages/userEntityGrant/confirm/index',
                            props: {
                                oakId: id,
                            },
                        },
                    }, context);
                }
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
    {
        name: '当创建userEntityGrant确认时，附上被授权者id',
        entity: 'userEntityGrant',
        action: 'confirm',
        when: 'after',
        fn: async ({ operation }, context, params) => {
            const { data, filter } = operation;
            const { userId } = (await context.getToken());
            const { result } = await context.rowStore.select('userEntityGrant', {
                data: {
                    id: 1,
                    entity: 1,
                    entityId: 1,
                    relation: 1,
                },
                filter: {
                    id: filter.id,
                },
                indexFrom: 0,
                count: 1,
            }, context, params);
            const { entity, entityId, relation } = result[0];
            const entityStr = entity[0].toLocaleUpperCase() + entity.substring(1, entity.length);
            const userRelation = `user${entityStr}`;
            const { result: result2 } = await context.rowStore.select(userRelation, {
                data: {
                    id: 1,
                },
                filter: {
                    userId,
                    relation,
                    [`${entity}Id`]: entityId,
                },
                indexFrom: 0,
                count: 1,
            }, context, params);
            if (result2.length) {
                throw new types_1.OakCongruentRowExists(result2[0], '已领用该权限');
            }
            else {
                await context.rowStore.operate(userRelation, {
                    action: 'create',
                    data: {
                        userId,
                        [`${entity}Id`]: entityId,
                        relation,
                    },
                }, context);
                console.log(context.rowStore);
                return 1;
            }
        }
    }
];
exports.default = triggers;
