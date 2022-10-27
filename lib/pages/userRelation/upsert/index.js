"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
exports.default = OakComponent({
    isList: false,
    data: {
        grantByUserEntityGrant: false,
        grantByEmail: false,
        grantByMobile: false,
        grantMethodCount: 0,
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    lifetimes: {
        ready: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var application, type, config, grantByUserEntityGrant, grantByMobile, grantByEmail, passport, grantMethodCount;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.features.application.getApplication()];
                        case 1:
                            application = _a.sent();
                            type = application.type, config = application.config;
                            grantByUserEntityGrant = false, grantByMobile = false, grantByEmail = false;
                            if (type.startsWith('wechat')) {
                                grantByUserEntityGrant = true;
                            }
                            else {
                                (0, assert_1.default)(type === 'web');
                                passport = config.passport;
                                grantByEmail = passport.includes('email');
                                grantByMobile = passport.includes('mobile');
                                grantByUserEntityGrant = passport.includes('wechat');
                            }
                            grantMethodCount = 0;
                            if (grantByEmail) {
                                grantMethodCount++;
                            }
                            if (grantByMobile) {
                                grantMethodCount++;
                            }
                            if (grantByUserEntityGrant) {
                                grantMethodCount++;
                            }
                            this.setState({
                                grantMethodCount: grantMethodCount,
                                grantByUserEntityGrant: grantByUserEntityGrant,
                                grantByEmail: grantByEmail,
                                grantByMobile: grantByMobile,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
