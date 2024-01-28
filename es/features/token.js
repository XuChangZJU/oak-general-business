import { Feature } from 'oak-frontend-base';
import { OakRowInconsistencyException, OakUnloggedInException, } from 'oak-domain/lib/types/Exception';
import { tokenProjection } from '../types/Projection';
import { OakUserInfoLoadingException } from '../types/Exception';
import { LOCAL_STORAGE_KEYS } from '../config/constants';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';
export class Token extends Feature {
    tokenValue;
    environment;
    cache;
    storage;
    async loadSavedToken() {
        let tokenValue = await this.storage.load(LOCAL_STORAGE_KEYS.token);
        /* if (!tokenValue) {
            // 历史数据，原来用的key太随意
            tokenValue = await this.storage.load('token:token');
            if (tokenValue) {
                await this.storage.save(LOCAL_STORAGE_KEYS.token, tokenValue);
                await this.storage.remove('token:token');
            }
        } */
        if (tokenValue) {
            const env = await this.environment.getEnv();
            try {
                const { result } = await this.cache.exec('refreshToken', {
                    tokenValue,
                    env,
                }, undefined, true, true);
                if (this.tokenValue !== result) {
                    this.tokenValue = result;
                    await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
                }
            }
            catch (err) {
                // refresh出了任何错都无视，直接放弃此token
                console.warn(err);
                this.tokenValue = undefined;
                this.removeToken(true);
            }
        }
        else {
            this.tokenValue = undefined;
        }
        this.publish();
    }
    constructor(cache, storage, environment) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.environment = environment;
        this.tokenValue = ''; // 置个空字符串代表还在load storage缓存的数据
        this.loadSavedToken();
    }
    async loginByMobile(mobile, password, captcha, disableRegister) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginByMobile', {
            password,
            mobile,
            captcha,
            disableRegister,
            env,
        }, undefined, true);
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
    async loginByWechatInWebEnv(wechatLoginId) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginByWechat', {
            env: env,
            wechatLoginId,
        });
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
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
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
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
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
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
        await this.cache.exec('logout', {
            tokenValue: this.tokenValue,
        }, undefined, undefined, true);
        this.removeToken();
    }
    removeToken(disablePublish) {
        this.tokenValue = undefined;
        this.storage.remove(LOCAL_STORAGE_KEYS.token);
        if (!disablePublish) {
            this.publish();
        }
    }
    getTokenValue() {
        if (this.tokenValue === '') {
            throw new OakUserInfoLoadingException();
        }
        return this.tokenValue;
    }
    getToken(allowUnloggedIn) {
        if (this.tokenValue === '') {
            throw new OakUserInfoLoadingException();
        }
        if (this.tokenValue) {
            const token = this.cache.get('token', {
                data: cloneDeep(tokenProjection),
                filter: {
                    value: this.tokenValue,
                },
            })[0];
            if (!token) {
                if (allowUnloggedIn) {
                    return undefined;
                }
                throw new OakUserInfoLoadingException();
            }
            return token;
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new OakUnloggedInException();
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
        const currentUserId = this.getUserId();
        if (currentUserId === userId) {
            throw new OakRowInconsistencyException(undefined, '您已经是当前用户');
        }
        await this.cache.exec('switchTo', {
            userId,
        });
        this.publish();
    }
    async refreshWechatPublicUserInfo() {
        await this.cache.exec('refreshWechatPublicUserInfo', {});
    }
    async getWechatMpUserPhoneNumber(code) {
        const env = await this.environment.getEnv();
        await this.cache.exec('getWechatMpUserPhoneNumber', {
            code,
            env: env,
        });
    }
    async wakeupParasite(id) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('wakeupParasite', {
            id,
            env: env,
        });
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
}
