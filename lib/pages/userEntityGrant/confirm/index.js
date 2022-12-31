"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relation: 1,
        granterId: 1,
        granter: {
            id: 1,
            name: 1,
            nickname: 1,
        },
        expired: 1,
        expiresAt: 1,
        entity: 1,
        entityId: 1,
        type: 1,
        granteeId: 1,
        number: 1,
        confirmed: 1,
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data, features = _a.features;
        var userId = features.token.getUserId(true);
        return {
            relation: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relation,
            type: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.type,
            expired: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expired,
            expiresAt: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expiresAt,
            granter: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.granter,
            entity: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entity,
            entityId: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entityId,
            granteeId: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.granteeId,
            number: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.number,
            confirmed: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.confirmed,
            userId: userId,
        };
    },
    methods: {
        handleConfirm: function () {
            return this.execute('confirm');
        },
    },
});
