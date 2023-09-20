"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendRuntimeContext = void 0;
const assert_1 = require("oak-domain/lib/utils/assert");
const oak_frontend_base_1 = require("oak-frontend-base");
const Exception_1 = require("../types/Exception");
const types_1 = require("oak-domain/lib/types");
;
class FrontendRuntimeContext extends oak_frontend_base_1.FrontendRuntimeContext {
    application;
    token;
    constructor(store, features) {
        super(store, features);
        this.application = features.application;
        this.token = features.token;
    }
    getSerializedData() {
        const data = super.getSerializedData();
        const appId = this.application.getApplicationId();
        if (appId) {
            Object.assign(data, {
                a: appId,
            });
        }
        const tokenValue = this.token.getTokenValue();
        if (tokenValue) {
            Object.assign(data, {
                t: tokenValue,
            });
        }
        return data;
    }
    getApplicationId() {
        return this.application?.getApplicationId();
    }
    getSystemId() {
        const app = this.application?.getApplication();
        return app?.systemId;
    }
    getApplication() {
        return this.application?.getApplication();
    }
    getTokenValue() {
        return this.token?.getTokenValue();
    }
    getToken(allowUnloggedIn) {
        return this.token?.getToken(allowUnloggedIn);
    }
    getCurrentUserId(allowUnloggedIn) {
        return this.token?.getUserId(allowUnloggedIn);
    }
    isRoot() {
        return this.token?.isRoot() || false;
    }
    isReallyRoot() {
        return this.token?.isReallyRoot() || false;
    }
    allowUserUpdate() {
        const userInfo = this.token?.getUserInfo();
        if (userInfo) {
            const { userState } = userInfo;
            if (userState === 'disabled') {
                throw new Exception_1.OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['merged'].includes(userState)) {
                throw new Exception_1.OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                (0, assert_1.assert)(userState === 'normal' || userState === 'shadow');
            }
            return true;
        }
        throw new types_1.OakUnloggedInException('您尚未登录');
    }
}
exports.FrontendRuntimeContext = FrontendRuntimeContext;
