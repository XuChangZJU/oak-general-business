import { Feature } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import { MediaType, MediaVideoDescription, MaterialType } from '../types/WeChat';
export declare class WechatMenu<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private storage;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage);
    getCurrentMenu(params: {
        applicationId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getCurrentMenu"]>>;
    getMenu(params: {
        applicationId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getMenu"]>>;
    createMenu(params: {
        applicationId: string;
        menuConfig: any;
        id: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["createMenu"]>>;
    createConditionalMenu(params: {
        applicationId: string;
        menuConfig: any;
        id: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["createConditionalMenu"]>>;
    deleteConditionalMenu(params: {
        applicationId: string;
        menuId: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["deleteConditionalMenu"]>>;
    deleteMenu(params: {
        applicationId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["deleteMenu"]>>;
    batchGetArticle(params: {
        applicationId: string;
        offset?: number;
        count: number;
        noContent?: 0 | 1;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["batchGetArticle"]>>;
    getArticle(params: {
        applicationId: string;
        articleId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getArticle"]>>;
    createMaterial(params: {
        applicationId: string;
        type: MediaType;
        file: File;
        description?: MediaVideoDescription;
        isPermanent?: boolean;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["uploadWechatMedia"]>>;
    batchGetMaterialList(params: {
        applicationId: string;
        type: MaterialType;
        offset?: number;
        count: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["batchGetMaterialList"]>>;
    /**
     * 获取素材详情
     * @param params
     * @returns
     */
    getMaterial(params: {
        applicationId: string;
        mediaId: string;
        isPermanent?: boolean;
    }): Promise<string | ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getMaterial"]>>;
}
