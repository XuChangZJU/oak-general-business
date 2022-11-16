"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
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
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var userId;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, features.token.getUserId(true)];
                    case 1:
                        userId = _b.sent();
                        return [2 /*return*/, {
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
                            }];
                }
            });
        });
    },
    observers: {
        relation: function (relation) {
            if (relation) {
                this.getUserRelations();
            }
        },
    },
    methods: {
        getUserRelations: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, relation, entityStr, userId, data;
                var _b, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.state, entity = _a.entity, entityId = _a.entityId, relation = _a.relation;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
                            return [4 /*yield*/, this.features.token.getUserId()];
                        case 1:
                            userId = _d.sent();
                            return [4 /*yield*/, this.features.cache.refresh("user".concat(entityStr), {
                                    data: (_b = {
                                            id: 1,
                                            userId: 1,
                                            relation: 1
                                        },
                                        _b["".concat(entity, "Id")] = 1,
                                        _b),
                                    filter: (_c = {
                                            userId: userId
                                        },
                                        _c["".concat(entity, "Id")] = entityId,
                                        _c.relation = relation,
                                        _c),
                                })];
                        case 2:
                            data = (_d.sent()).data;
                            this.setState({
                                isExists: data.length > 0,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        handleConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var oakId;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            oakId = this.props.oakId;
                            return [4 /*yield*/, this.execute({
                                    action: 'confirm',
                                    data: {},
                                    filter: {
                                        id: oakId,
                                    },
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
