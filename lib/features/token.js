"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
const Exception_1 = require("oak-domain/lib/types/Exception");
const Projection_1 = require("../types/Projection");
const Exception_2 = require("../types/Exception");
const constants_1 = require("../config/constants");
const lodash_1 = require("oak-domain/lib/utils/lodash");
class Token extends oak_frontend_base_1.Feature {
    tokenValue;
    environment;
    cache;
    storage;
    isLoading = false;
    constructor(cache, storage, environment) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.environment = environment;
        let tokenValue = storage.load(constants_1.LOCAL_STORAGE_KEYS.token);
        if (!tokenValue) {
            // 历史数据，原来用的key太随意
            tokenValue = storage.load('token:token');
            if (tokenValue) {
                storage.save(constants_1.LOCAL_STORAGE_KEYS.token, tokenValue);
                storage.remove('token:token');
            }
        }
        if (tokenValue) {
            this.tokenValue = tokenValue;
            // this.loadTokenInfo();
        }
    }
    async loadTokenInfo() {
        if (this.tokenValue && !this.isLoading) {
            this.isLoading = true;
            await this.cache.refresh('token', {
                data: (0, lodash_1.cloneDeep)(Projection_1.tokenProjection),
                filter: {
                    id: this.tokenValue,
                },
            });
            this.publish();
            this.isLoading = false;
        }
    }
    async loginByMobile(mobile, password, captcha) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginByMobile', {
            password,
            mobile,
            captcha,
            env,
        });
        this.tokenValue = result;
        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
    async loginByWechatInWebEnv(wechatLoginId) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginByWechat', {
            env: env,
            wechatLoginId,
        });
        this.tokenValue = result;
        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
    async loginWechat(code, params) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginWechat', {
            code,
            env: env,
            wechatLoginId: params?.wechatLoginId,
        });
        this.tokenValue = result;
        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
    async loginWechatMp() {
        const { code } = await wx.login();
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginWechatMp', {
            code,
            env: env,
        });
        this.tokenValue = result;
        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
    async syncUserInfoWechatMp() {
        const info = await wx.getUserProfile({
            desc: '同步微信昵称和头像信息',
        });
        const { userInfo: { nickName: nickname, avatarUrl }, encryptedData, signature, iv, } = info;
        await this.cache.exec('syncUserInfoWechatMp', {
            nickname,
            avatarUrl,
            encryptedData,
            signature,
            iv,
        });
        this.publish();
    }
    async logout() {
        await this.cache.exec('logout', {});
        this.removeToken();
    }
    removeToken() {
        this.tokenValue = undefined;
        this.storage.remove(constants_1.LOCAL_STORAGE_KEYS.token);
        this.publish();
    }
    getTokenValue() {
        return this.tokenValue;
    }
    getToken(allowUnloggedIn) {
        if (this.tokenValue) {
            const token = this.cache.get('token', {
                data: (0, lodash_1.cloneDeep)(Projection_1.tokenProjection),
                filter: {
                    id: this.tokenValue,
                },
            })[0];
            if (!token) {
                this.loadTokenInfo();
                if (allowUnloggedIn) {
                    return undefined;
                }
                throw new Exception_2.OakUserInfoLoadingException();
            }
            return token;
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new Exception_1.OakUnloggedInException();
    }
    getUserId(allowUnloggedIn) {
        const token = this.getToken(allowUnloggedIn);
        if (token?.userId) {
            return token.userId;
        }
    }
    // getUserInfo 不要求登录
    getUserInfo() {
        const token = this.getToken(true);
        if (token?.user) {
            return token.user;
        }
    }
    isRoot() {
        const token = this.getToken(true);
        return !!token?.user?.isRoot;
    }
    /**
     * 这个是指token的player到底是不是root
     * @returns
     */
    isReallyRoot() {
        const token = this.getToken(true);
        return !!token?.player?.isRoot;
    }
    async sendCaptcha(mobile, type) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('sendCaptcha', {
            mobile,
            env: env,
            type,
        });
        return result;
    }
    async switchTo(userId) {
        if (!this.isReallyRoot()) {
            throw new Exception_1.OakUserUnpermittedException();
        }
        const currentUserId = this.getUserId();
        if (currentUserId === userId) {
            throw new Exception_1.OakRowInconsistencyException(undefined, '您已经是当前用户');
        }
        await this.cache.exec('switchTo', {
            userId,
        });
        this.publish();
    }
    async refreshWechatPublicUserInfo() {
        await this.cache.exec('refreshWechatPublicUserInfo', {});
        this.publish();
    }
    async getWechatMpUserPhoneNumber(code) {
        const env = await this.environment.getEnv();
        await this.cache.exec('getWechatMpUserPhoneNumber', {
            code,
            env: env,
        });
        this.publish();
    }
    async wakeupParasite(id) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('wakeupParasite', {
            id,
            env: env,
        });
        this.tokenValue = result;
        this.storage.save(constants_1.LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
}
exports.Token = Token;
