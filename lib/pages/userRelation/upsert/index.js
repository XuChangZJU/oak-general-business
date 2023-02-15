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
        redirectToAfterConfirm: Object,
        qrCodeType: String,
    },
    lifetimes: {
        ready: function () {
            var application = this.features.application.getApplication();
            var type = application.type, config = application.config;
            var grantByUserEntityGrant = false, grantByMobile = false, grantByEmail = false;
            if (type.startsWith('wechat')) {
                grantByUserEntityGrant = true;
            }
            else {
                (0, assert_1.default)(type === 'web');
                var passport = config.passport || [];
                grantByEmail = passport.includes('email');
                grantByMobile = passport.includes('mobile');
                grantByUserEntityGrant = passport.includes('wechat');
            }
            var grantMethodCount = 0;
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
        },
    },
});
