import { Feature } from 'oak-frontend-base';
export class WechatMenu extends Feature {
    cache;
    storage;
    constructor(cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }
    async getCurrentMenu(params) {
        const callBack = await this.cache.exec('getCurrentMenu', params);
        return callBack.result;
    }
    async getMenu(params) {
        const callBack = await this.cache.exec('getMenu', params);
        return callBack.result;
    }
    async createMenu(params) {
        const callBack = await this.cache.exec('createMenu', params);
        return callBack.result;
    }
    async createConditionalMenu(params) {
        const callBack = await this.cache.exec('createConditionalMenu', params);
        return callBack.result;
    }
    async deleteConditionalMenu(params) {
        const callBack = await this.cache.exec('deleteConditionalMenu', params);
        return callBack.result;
    }
    async batchGetArticle(params) {
        const callBack = await this.cache.exec('batchGetArticle', params);
        return callBack.result;
    }
    async getArticle(params) {
        const callBack = await this.cache.exec('getArticle', params);
        return callBack.result;
    }
    async createMaterial(params) {
        const callBack = await this.cache.exec('createMaterial', params);
        return callBack.result;
    }
    async batchGetMaterialList(params) {
        const callBack = await this.cache.exec('batchGetMaterialList', params);
        return callBack.result;
    }
    async getMaterial(params) {
        const callBack = await this.cache.exec('getMaterial', params);
        return callBack.result;
    }
}
