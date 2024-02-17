import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
export declare class UserWechatPublicTag<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private storage;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage);
    getTagUsers(params: {
        applicationId: string;
        tagId: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getTagUsers"]>>;
    batchtagging(params: {
        applicationId: string;
        openIdList: string[];
        tagId: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["batchtagging"]>>;
    batchuntagging(params: {
        applicationId: string;
        openIdList: string[];
        tagId: number;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["batchuntagging"]>>;
    getUserTags(params: {
        applicationId: string;
        openId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getUserTags"]>>;
    getUsers(params: {
        applicationId: string;
        nextOpenId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["getUsers"]>>;
    tagging(params: {
        applicationId: string;
        openId: string;
        tagIdList: number[];
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["tagging"]>>;
    syncToLocale(params: {
        applicationId: string;
        openId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["syncToLocale"]>>;
    syncToWechat(params: {
        applicationId: string;
        id: string;
        openId: string;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["syncToWechat"]>>;
}
