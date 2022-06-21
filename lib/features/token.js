"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const lodash_1 = require("lodash");
const oak_frontend_base_1 = require("oak-frontend-base");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
class Token extends oak_frontend_base_1.Feature {
    token;
    rwLock;
    cache;
    context;
    constructor(aspectWrapper, cache, context) {
        super(aspectWrapper);
        this.rwLock = new concurrent_1.RWLock();
        this.cache = cache;
        this.context = context;
    }
    async loginByPassword(mobile, password) {
        await this.rwLock.acquire('X');
        try {
            const { result } = await this.getAspectWrapper().exec('loginByPassword', { password, mobile });
            this.token = result;
            this.rwLock.release();
            this.context.setToken(result);
        }
        catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
    async loginWechatMp(scene) {
        await this.rwLock.acquire('X');
        try {
            const { code } = await wx.login();
            const env = await wx.getSystemInfo();
            const env2 = (0, lodash_1.pick)(env, [
                'brand',
                'model',
                'pixelRatio',
                'screenWidth',
                'screenHeight',
                'windowWidth',
                'windowHeight',
                'statusBarHeight',
                'language',
                'version',
                'system',
                'platform',
                'fontSizeSetting',
                'SDKVersion'
            ]);
            const { result } = await this.getAspectWrapper().exec('loginWechatMp', {
                code,
                env: Object.assign(env2, { type: 'wechatMp' }),
            });
            this.token = result;
            this.context.setToken(result);
            this.rwLock.release();
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
}
__decorate([
    oak_frontend_base_1.Action
], Token.prototype, "loginByPassword", null);
__decorate([
    oak_frontend_base_1.Action
], Token.prototype, "loginWechatMp", null);
__decorate([
    oak_frontend_base_1.Action
], Token.prototype, "syncUserInfoWechatMp", null);
__decorate([
    oak_frontend_base_1.Action
], Token.prototype, "logout", null);
exports.Token = Token;
