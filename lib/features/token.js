"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
class Token extends oak_frontend_base_1.Feature {
    token;
    rwLock;
    constructor() {
        super();
        this.rwLock = new concurrent_1.RWLock();
    }
    async loginByPassword(mobile, password) {
        await this.rwLock.acquire('X');
        this.token = await this.getAspectProxy().loginByPassword({ password, mobile });
        this.rwLock.release();
    }
    async loginWechatMp(code, env) {
        await this.rwLock.acquire('X');
        this.token = await this.getAspectProxy().loginWechatMp({
            code,
            env,
        });
        this.rwLock.release();
    }
    async syncUserInfoWechatMp() {
        const info = await wx.getUserProfile({
            desc: '同步微信昵称和头像信息',
        });
        const { userInfo: { nickName: nickname, avatarUrl }, encryptedData, signature, iv } = info;
        await this.getAspectProxy().syncUserInfoWechatMp({
            nickname,
            avatarUrl,
            encryptedData,
            signature,
            iv,
        });
    }
    async logout() {
        this.token = undefined;
    }
    async getToken() {
        await this.rwLock.acquire('S');
        const token = this.token;
        this.rwLock.release();
        return token;
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
