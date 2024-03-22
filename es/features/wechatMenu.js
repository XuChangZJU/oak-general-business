import { Feature } from 'oak-frontend-base/es/types/Feature';
export class WechatMenu extends Feature {
    cache;
    storage;
    constructor(cache, storage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }
    async getCurrentMenu(params) {
        const { result } = await this.cache.exec('getCurrentMenu', params);
        return result;
    }
    async getMenu(params) {
        const { result } = await this.cache.exec('getMenu', params);
        return result;
    }
    async createMenu(params) {
        const { result } = await this.cache.exec('createMenu', params);
        return result;
    }
    async createConditionalMenu(params) {
        const { result } = await this.cache.exec('createConditionalMenu', params);
        return result;
    }
    async deleteConditionalMenu(params) {
        const { result } = await this.cache.exec('deleteConditionalMenu', params);
        return result;
    }
    async deleteMenu(params) {
        const { result } = await this.cache.exec('deleteMenu', params);
        return result;
    }
    async batchGetArticle(params) {
        const { result } = await this.cache.exec('batchGetArticle', params);
        return result;
    }
    async getArticle(params) {
        const { result } = await this.cache.exec('getArticle', params);
        return result;
    }
    async createMaterial(params) {
        const { applicationId, type, file, description, isPermanent = false, } = params;
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
        const { result } = await this.cache.exec('uploadWechatMedia', formData);
        return result;
    }
    async batchGetMaterialList(params) {
        const { result } = await this.cache.exec('batchGetMaterialList', params);
        return result;
    }
    /**
     * 获取素材详情
     * @param params
     * @returns
     */
    async getMaterial(params) {
        const { result } = await this.cache.exec('getMaterial', params);
        return result;
    }
}
