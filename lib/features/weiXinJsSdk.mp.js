"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeiXinJsSdk = void 0;
const Feature_1 = require("oak-frontend-base/es/types/Feature");
class WeiXinJsSdk extends Feature_1.Feature {
    cache;
    storage;
    constructor(cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }
    wxConfig() {
        console.warn('小程序无需该操作');
    }
    async initWeiXinJsSDK() {
        console.warn('小程序无需该操作');
    }
    async loadWeiXinJsSDK() {
        console.warn('小程序无需该操作');
    }
}
exports.WeiXinJsSdk = WeiXinJsSdk;
