import { Feature } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';

export class WechatPublicTag<
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

    async createTag(params: {
        applicationId: string,
        name: string,
    }) {
        const callBack = await this.cache.exec('createTag', params);
        return callBack.result;
    }

    async getTags(params: {
        applicationId: string,
    }) {
        const callBack = await this.cache.exec('getTags', params);
        return callBack.result;
    }

    async editTag(params: {
        applicationId: string,
        id: number,
        name: string,
    }) {
        const callBack = await this.cache.exec('editTag', params);
        return callBack.result;
    }

    async deleteTag(params: {
        applicationId: string,
        id: string,
        wechatId: number,
    }) {
        const callBack = await this.cache.exec('deleteTag', params);
        return callBack.result;
    }

    async syncTag(params: {
        applicationId: string,
        id: string,
    }) {
        const callBack = await this.cache.exec('syncTag', params);
        return callBack.result;
    }

    async oneKeySync(params: {
        applicationId: string,
    }) {
        const callBack = await this.cache.exec('oneKeySync', params);
        return callBack.result;
    }
}
