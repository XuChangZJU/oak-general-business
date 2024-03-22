import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';


export class UserWechatPublicTag<
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

    async getTagUsers(params: {
        applicationId: string,
        tagId: number,
    },) {
        const callBack = await this.cache.exec('getTagUsers', params);
        return callBack.result;
    }

    async batchtagging(params: {
        applicationId: string,
        openIdList: string[],
        tagId: number,
    },) {
        const callBack = await this.cache.exec('batchtagging', params);
        return callBack.result;
    }

    async batchuntagging(params: {
        applicationId: string,
        openIdList: string[],
        tagId: number,
    }) {
        const callBack = await this.cache.exec('batchuntagging', params);
        return callBack.result;
    }

    async getUserTags(params: {
        applicationId: string,
        openId: string,
    },) {
        const callBack = await this.cache.exec('getUserTags', params);
        return callBack.result;
    }

    async getUsers(params: {
        applicationId: string,
        nextOpenId: string,
    },) {
        const callBack = await this.cache.exec('getUsers', params);
        return callBack.result;
    }

    async tagging(params: {
        applicationId: string,
        openId: string,
        tagIdList: number[],
    },) {
        const callBack = await this.cache.exec('tagging', params);
        return callBack.result;
    }

    async syncToLocale(params: {
        applicationId: string,
        openId: string,
    },) {
        const callBack = await this.cache.exec('syncToLocale', params);
        return callBack.result;
    }

    async syncToWechat(params: {
        applicationId: string,
        id: string,
        openId: string,
    },) {
        const callBack = await this.cache.exec('syncToWechat', params);
        return callBack.result;
    }
}
