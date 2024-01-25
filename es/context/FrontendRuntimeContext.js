import { assert } from 'oak-domain/lib/utils/assert';
import { FrontendRuntimeContext as Frc } from 'oak-frontend-base';
import { OakApplicationLoadingException, OakTokenExpiredException, OakUserDisabledException, OakUserInfoLoadingException, } from '../types/Exception';
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
    async getSerializedData() {
        const data = await super.getSerializedData();
        const setAppId = async () => {
            // appId必须要取到，不能失败
            const setInner = (resolve, reject) => {
                try {
                    const appId = this.application.getApplicationId();
                    assert(appId);
                    Object.assign(data, {
                        a: appId,
                    });
                    resolve(undefined);
                }
                catch (err) {
                    if (err instanceof OakApplicationLoadingException) {
                        const fn = this.application.subscribe(() => {
                            fn();
                            setInner(resolve, reject);
                        });
                    }
                    else {
                        reject(err);
                    }
                }
            };
            return new Promise((resolve, reject) => setInner(resolve, reject));
        };
        await setAppId();
        const setTokenValue = async () => {
            const setInner = (resolve, reject) => {
                try {
                    const tokenValue = this.token.getTokenValue();
                    if (tokenValue) {
                        Object.assign(data, {
                            t: tokenValue,
                        });
                    }
                    resolve(undefined);
                }
                catch (err) {
                    if (err instanceof OakUserInfoLoadingException) {
                        const fn = this.token.subscribe(() => {
                            fn();
                            setInner(resolve, reject);
                        });
                    }
                    else {
                        reject(err);
                    }
                }
            };
            return new Promise((resolve, reject) => setInner(resolve, reject));
        };
        await setTokenValue();
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
