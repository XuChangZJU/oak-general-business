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
        qrCodeType: 1,
        granteeId: 1,
        number: 1,
        confirmed: 1,
        redirectTo: 1,
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data, features = _a.features;
        var userId = features.token.getUserId(true);
        var granter = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.granter;
        var type = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.type;
        var relation = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relation;
        var entity = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entity;
        return {
            relation: relation,
            type: type,
            expired: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expired,
            expiresAt: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expiresAt,
            granter: granter,
            entity: entity,
            entityId: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entityId,
            granteeId: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.granteeId,
            number: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.number,
            confirmed: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.confirmed,
            userId: userId,
            redirectTo: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.redirectTo,
        };
    },
    data: {
        redirectCounter: 0,
        hasConfirmed: false,
        loading: true,
    },
    listeners: {
        redirectCounter: function (prev, next) {
            var _this = this;
            if (next.redirectCounter > 0) {
                setTimeout(function () {
                    _this.setState({
                        redirectCounter: next.redirectCounter - 1,
                    });
                }, 1000);
            }
            else {
                this.redirectPage();
            }
        },
    },
    methods: {
        getUserRelations: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, _a, entity, entityId, relation, entityStr, data;
                var _b, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            userId = this.features.token.getUserId(true);
                            if (!userId) {
                                return [2 /*return*/];
                            }
                            _a = this.state, entity = _a.entity, entityId = _a.entityId, relation = _a.relation;
                            entityStr = (0, string_1.firstLetterUpperCase)(entity);
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
                        case 1:
                            data = (_d.sent()).data;
                            this.setState({
                                hasConfirmed: data.length > 0,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        handleConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var redirectTo;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute('confirm')];
                        case 1:
                            _a.sent();
                            redirectTo = this.state.redirectTo;
                            if (redirectTo) {
                                this.setState({
                                    redirectCounter: 5,
                                    hasConfirmed: true,
                                });
                            }
                            else {
                                this.setState({
                                    hasConfirmed: true,
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        redirectPage: function () {
            var redirectTo = this.props.redirectTo;
            var pathname = redirectTo.pathname, _a = redirectTo.props, props = _a === void 0 ? {} : _a, _b = redirectTo.state, state = _b === void 0 ? {} : _b;
            var url = pathname.substring(0, 1) === '/' ? pathname : "/".concat(pathname);
            this.redirectTo(tslib_1.__assign({ url: url }, props), state);
        },
    },
});
