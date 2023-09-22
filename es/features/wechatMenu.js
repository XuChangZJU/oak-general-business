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
        const { applicationId, type, file, description, isPermanent = false } = params;
        const formData = new FormData();
        formData.append('applicationId', applicationId);
        formData.append('type', type);
        formData.append('file', file);
        if (description) {
            formData.append('description', JSON.stringify(description));
        }
        if (isPermanent) {
            formData.append('isPermanent', `${isPermanent}`);
        }
        const callBack = await this.cache.exec('uploadWechatMedia', formData);
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
