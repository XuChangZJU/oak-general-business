import { Feature } from 'oak-frontend-base';
export class WechatPublicTag extends Feature {
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
    async syncTag(params) {
        const callBack = await this.cache.exec('syncTag', params);
        return callBack.result;
    }
    async oneKeySync(params) {
        const callBack = await this.cache.exec('oneKeySync', params);
        return callBack.result;
    }
}
