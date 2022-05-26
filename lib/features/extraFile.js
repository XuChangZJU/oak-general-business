"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraFile = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
const concurrent_1 = require("oak-domain/lib/utils/concurrent");
const uplpad_1 = require("oak-frontend-base/lib/features/uplpad");
class ExtraFile extends oak_frontend_base_1.Feature {
    rwLock;
    constructor() {
        super();
        this.rwLock = new concurrent_1.RWLock();
    }
    async upload(extraFile, scene) {
        await this.rwLock.acquire('X');
        try {
            const { origin, extra1: filePath, filename: fileName } = extraFile;
            const uploadInfo = await this.getAspectProxy().getUploadInfo({
                origin,
                fileName,
            }, scene);
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                // 微信小程序使用wx.uploadFile, 封装upload，上传源为origin
                const up = new uplpad_1.Upload();
                const result = await up.uploadFile(origin, filePath, uploadInfo);
                this.rwLock.release();
                return result;
            }
            this.rwLock.release();
        }
        catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
}
__decorate([
    oak_frontend_base_1.Action
], ExtraFile.prototype, "upload", null);
exports.ExtraFile = ExtraFile;
