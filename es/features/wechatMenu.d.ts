import { Feature } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
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
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["createMenu"]>>;
    createConditionalMenu(params: {
        applicationId: string;
        menuConfig: any;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["createConditionalMenu"]>>;
    deleteConditionalMenu(params: {
        applicationId: string;
        menuid: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["deleteConditionalMenu"]>>;
    batchGetArticle(params: {
        applicationId: string;
        offset?: number;
        count: number;
        noContent?: 0 | 1;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["batchGetArticle"]>>;
    getArticle(params: {
        applicationId: string;
        article_id: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getArticle"]>>;
    createMaterial(params: {
        applicationId: string;
        type: 'image' | 'voice' | 'video' | 'thumb';
        media: FormData;
        description?: FormData;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["createMaterial"]>>;
    batchGetMaterialList(params: {
        applicationId: string;
        type: 'image' | 'video' | 'voice' | 'news';
        offset?: number;
        count: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["batchGetMaterialList"]>>;
    getMaterial(params: {
        applicationId: string;
        type: 'image' | 'video' | 'voice' | 'news';
        media_id: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getMaterial"]>>;
}
