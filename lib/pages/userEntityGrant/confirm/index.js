"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
            redirectTo: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.redirectTo,
        };
    },
    data: {
        redirectCounter: 0,
        hasConfirmed: false,
    },
    observers: {
        redirectCounter: function (value) {
            var _this = this;
            if (value > 0) {
                setTimeout(function () {
                    _this.setState({
                        redirectCounter: value - 1,
                    });
                }, 1000);
            }
            else {
                this.redirectMp();
            }
        },
    },
    methods: {
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
        redirectMp: function () {
            var redirectTo = this.props.redirectTo;
            var url = redirectTo.url, _a = redirectTo.props, props = _a === void 0 ? {} : _a;
            this.redirectTo(tslib_1.__assign({ url: url }, props));
        },
    },
});
