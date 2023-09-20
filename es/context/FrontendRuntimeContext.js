import { assert } from 'oak-domain/lib/utils/assert';
import { FrontendRuntimeContext as Frc } from 'oak-frontend-base';
import { OakTokenExpiredException, OakUserDisabledException, } from '../types/Exception';
import { OakUnloggedInException } from 'oak-domain/lib/types';
;
export class FrontendRuntimeContext extends Frc {
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
                throw new OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['merged'].includes(userState)) {
                throw new OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                assert(userState === 'normal' || userState === 'shadow');
            }
            return true;
        }
        throw new OakUnloggedInException('您尚未登录');
    }
}
