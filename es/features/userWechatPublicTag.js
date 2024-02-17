import { Feature } from 'oak-frontend-base/es/types/Feature';
export class UserWechatPublicTag extends Feature {
    cache;
    storage;
    constructor(cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }
    async getTagUsers(params) {
        const callBack = await this.cache.exec('getTagUsers', params);
        return callBack.result;
    }
    async batchtagging(params) {
        const callBack = await this.cache.exec('batchtagging', params);
        return callBack.result;
    }
    async batchuntagging(params) {
        const callBack = await this.cache.exec('batchuntagging', params);
        return callBack.result;
    }
    async getUserTags(params) {
        const callBack = await this.cache.exec('getUserTags', params);
        return callBack.result;
    }
    async getUsers(params) {
        const callBack = await this.cache.exec('getUsers', params);
        return callBack.result;
    }
    async tagging(params) {
        const callBack = await this.cache.exec('tagging', params);
        return callBack.result;
    }
    async syncToLocale(params) {
        const callBack = await this.cache.exec('syncToLocale', params);
        return callBack.result;
    }
    async syncToWechat(params) {
        const callBack = await this.cache.exec('syncToWechat', params);
        return callBack.result;
    }
}
