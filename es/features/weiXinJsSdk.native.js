import { Feature } from 'oak-frontend-base/es/types/Feature';
export class WeiXinJsSdk extends Feature {
    cache;
    storage;
    constructor(cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }
    wxConfig() {
        console.warn('native无需该操作');
    }
    async initWeiXinJsSDK() {
        console.warn('native无需该操作');
    }
    async loadWeiXinJsSDK() {
        console.warn('native无需该操作');
    }
}
