"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const Feature_1 = require("oak-frontend-base/lib/types/Feature");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
const env_1 = require("../utils/env");
const constants_1 = require("../constants");
class Token extends Feature_1.Feature {
    token;
    rwLock;
    cache;
    context;
    storage;
    constructor(aspectWrapper, cache, storage, context) {
        super(aspectWrapper);
        this.rwLock = new concurrent_1.RWLock();
        this.cache = cache;
        this.context = context;
        this.storage = storage;
        const token = storage.load('token:token');
        if (token) {
            this.token = token;
            this.context.setToken(token);
        }
    }
    async loginByMobile(mobile, password, captcha) {
        const env = await (0, env_1.getEnv)();
        await this.rwLock.acquire('X');
        try {
            const { result } = await this.getAspectWrapper().exec('loginByMobile', { password, mobile, captcha, env });
            this.token = result;
            this.rwLock.release();
            this.storage.save('token:token', result);
            this.context.setToken(result);
        }
        catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
    async loginWechatMp() {
        await this.rwLock.acquire('X');
        try {
            const { code } = await wx.login();
            const env = await (0, env_1.getEnv)();
            const { result } = await this.getAspectWrapper().exec('loginWechatMp', {
                code,
                env: env,
            });
            this.token = result;
            this.rwLock.release();
            this.storage.save('token:token', result);
            this.context.setToken(result);
        }
        catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
    async syncUserInfoWechatMp() {
        const info = await wx.getUserProfile({
            desc: '同步微信昵称和头像信息',
        });
        const { userInfo: { nickName: nickname, avatarUrl }, encryptedData, signature, iv } = info;
        await this.getAspectWrapper().exec('syncUserInfoWechatMp', {
            nickname,
            avatarUrl,
            encryptedData,
            signature,
            iv,
        });
    }
    async logout() {
        this.token = undefined;
        this.context.setToken(undefined);
        this.storage.remove('token:token');
    }
    async getToken() {
        await this.rwLock.acquire('S');
        try {
            const token = this.token;
            this.rwLock.release();
            return token;
        }
        catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
    async getUserId() {
        const token = await this.getToken();
        if (!token) {
            return;
        }
        const result = await this.cache.get('token', {
            data: {
                id: 1,
                userId: 1,
            },
            filter: {
                id: token,
            }
        });
        return result[0]?.userId;
    }
    async isRoot() {
        const token = await this.getToken();
        if (!token) {
            return false;
        }
        const [tokenValue] = (await this.cache.get('token', {
            data: {
                id: 1,
                userId: 1,
                player: {
                    id: 1,
                    userRole$user: {
                        $entity: 'userRole',
                        data: {
                            id: 1,
                            userId: 1,
                            roleId: 1,
                        },
                    },
                },
            },
            filter: {
                id: token,
            }
        }));
        return tokenValue?.player?.userRole$user.length > 0 ? tokenValue?.player?.userRole$user[0]?.roleId === constants_1.ROOT_ROLE_ID : false;
    }
    async sendCaptcha(mobile) {
        const env = await (0, env_1.getEnv)();
        const { result } = await this.getAspectWrapper().exec('sendCaptcha', {
            mobile,
            env: env,
        });
        return result;
    }
}
__decorate([
    Feature_1.Action
], Token.prototype, "loginByMobile", null);
__decorate([
    Feature_1.Action
], Token.prototype, "loginWechatMp", null);
__decorate([
    Feature_1.Action
], Token.prototype, "syncUserInfoWechatMp", null);
__decorate([
    Feature_1.Action
], Token.prototype, "logout", null);
__decorate([
    Feature_1.Action
], Token.prototype, "sendCaptcha", null);
exports.Token = Token;
