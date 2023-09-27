"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WechatPublicTag = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class WechatPublicTag extends oak_frontend_base_1.Feature {
    cache;
    storage;
    constructor(cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }
    async createTag(params) {
        const callBack = await this.cache.exec('createTag', params);
        return callBack.result;
    }
    async getTags(params) {
        const callBack = await this.cache.exec('getTags', params);
        return callBack.result;
    }
    async editTag(params) {
        const callBack = await this.cache.exec('editTag', params);
        return callBack.result;
    }
    async deleteTag(params) {
        const callBack = await this.cache.exec('deleteTag', params);
        return callBack.result;
    }
}
exports.WechatPublicTag = WechatPublicTag;
