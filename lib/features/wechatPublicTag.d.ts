import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
export declare class WechatPublicTag<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private storage;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage);
    createTag(params: {
        applicationId: string;
        name: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["createTag"]>>;
    getTags(params: {
        applicationId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getTags"]>>;
    editTag(params: {
        applicationId: string;
        id: number;
        name: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["editTag"]>>;
    deleteTag(params: {
        applicationId: string;
        id: string;
        wechatId: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["deleteTag"]>>;
    syncTag(params: {
        applicationId: string;
        id: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["syncTag"]>>;
    oneKeySync(params: {
        applicationId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["oneKeySync"]>>;
}
