"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const types_1 = require("oak-domain/lib/types");
const assert_1 = tslib_1.__importDefault(require("assert"));
const oak_domain_1 = require("oak-domain");
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'userEntityGrant',
        checker: (data) => {
            if (data instanceof Array) {
                data.forEach((ele) => {
                    if (!ele.relationIds || ele.relationIds.length === 0) {
                        throw new types_1.OakInputIllegalException('userEntityGrant', ['relationIds'], '至少应选择一个关系');
                    }
                });
            }
            else {
                if (!data.relationIds || data.relationIds.length === 0) {
                    throw new types_1.OakInputIllegalException('userEntityGrant', ['relationIds'], '至少应选择一个关系');
                }
            }
        },
    },
    {
        type: 'logical',
        entity: 'userEntityGrant',
        action: 'claim',
        checker: (operation, context, option) => {
            const { data, filter } = operation;
            (0, assert_1.default)(Object.keys(data).length === 1 && data.hasOwnProperty('userEntityClaim$ueg'));
            const { userEntityClaim$ueg } = data;
            (0, assert_1.default)(filter.id);
            (0, assert_1.default)(userEntityClaim$ueg instanceof Array);
            const result = context.select('userEntityGrant', {
                data: {
                    id: 1,
                    relationEntity: 1,
                },
                filter,
            }, option);
            const createUserRelations = (userEntityGrant) => {
                const { relationEntity } = userEntityGrant;
                userEntityClaim$ueg.forEach((uec) => {
                    const { action, data } = uec;
                    (0, assert_1.default)(action === 'create');
                    const { userId, relationId, claimEntityId } = data;
                    Object.assign(data, {
                        userRelation: {
                            id: (0, oak_domain_1.generateNewId)(),
                            action: 'create',
                            data: {
                                id: (0, oak_domain_1.generateNewId)(),
                                userId,
                                relationId,
                                entityId: claimEntityId,
                                entity: relationEntity,
                            }
                        }
                    });
                });
                return userEntityClaim$ueg.length;
            };
            if (result instanceof Promise) {
                return result.then(([ueg]) => createUserRelations(ueg));
            }
            return createUserRelations(result[0]);
        }
    }
];
exports.default = checkers;
