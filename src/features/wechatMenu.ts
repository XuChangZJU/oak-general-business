import { Feature } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import {
   MediaType,
   MediaVideoDescription,
   MenuType
} from '../types/WeChat'


export class WechatMenu<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage;

    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }

    async getCurrentMenu(params: {
        applicationId: string,
    },) {
        const callBack = await this.cache.exec('getCurrentMenu', params);
        return callBack.result;
    }

    async getMenu(params: {
        applicationId: string,
    },) {
        const callBack = await this.cache.exec('getMenu', params);
        return callBack.result;
    }

    async createMenu(params: {
        applicationId: string,
        menuConfig: any,
        id: string,
    }) {
        const callBack = await this.cache.exec('createMenu', params);
        return callBack.result;
    }

    async createConditionalMenu(params: {
        applicationId: string,
        menuConfig: any,
        id: string,
    },) {
        const callBack = await this.cache.exec('createConditionalMenu', params);
        return callBack.result;
    }

    async deleteConditionalMenu(params: {
        applicationId: string,
        menuId: number
    },) {
        const callBack = await this.cache.exec('deleteConditionalMenu', params);
        return callBack.result;
    }

    
    async deleteMenu(params: {
        applicationId: string,
    },) {
        const callBack = await this.cache.exec('deleteMenu', params);
        return callBack.result;
    }

    async batchGetArticle(params: {
        applicationId: string,
        offset?: number;
        count: number;
        noContent?: 0 | 1;
    },) {
        const callBack = await this.cache.exec('batchGetArticle', params);
        return callBack.result;
    }

    async getArticle(params: {
        applicationId: string,
        articleId: string
    },) {
        const callBack = await this.cache.exec('getArticle', params);
        return callBack.result;
    }

    async createMaterial(params: {
        applicationId: string,
        type: MediaType,
        file: File,
        description?: MediaVideoDescription,
        isPermanent?: boolean
    }) {
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

    async batchGetMaterialList(params: {
        applicationId: string,
        type: MenuType,
        offset?: number;
        count: number;
    },) {
        const callBack = await this.cache.exec('batchGetMaterialList', params);
        return callBack.result;
    }

    async getMaterial(params: {
        applicationId: string,
        type: MenuType,
        mediaId: string,
    },) {
        const callBack = await this.cache.exec('getMaterial', params);
        return callBack.result;
    }
}
