import { Feature } from 'oak-frontend-base';
export class WeiXinJsSdk extends Feature {
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
