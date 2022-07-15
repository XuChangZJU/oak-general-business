import { EntityDict } from 'general-app-domain';
import { AppType } from 'general-app-domain/Application/Schema';
import { Action, Feature, LocalStorage } from 'oak-frontend-base';
import { Aspect, AspectWrapper, Context, SelectRowShape } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { Cache } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import assert from 'assert';

import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '../RuntimeContext';

const projection: {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
    }
} = {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
    }
};

export class Application<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private applicationId?: string;
    private application?: SelectRowShape<ED['application']['Schema'], typeof projection>;
    private rwLock: RWLock;
    private cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;

    constructor(
        aspectWrapper: AspectWrapper<ED, Cxt, AD>,
        type: AppType,
        url: string,
        cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
        storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
        callback: (application: SelectRowShape<ED['application']['Schema'], typeof projection>) => void) {
        super(aspectWrapper);
        this.rwLock = new RWLock();
        this.cache = cache;
        this.storage = storage;
        const applicationId = storage.load('application:applicationId');
        this.rwLock.acquire('X');
        if (applicationId) {
            this.applicationId = applicationId;
            this.getApplicationFromCache(callback);
        }
        else {
            this.refresh(type, url, callback);
        }
        this.rwLock.release();
    }

    private async getApplicationFromCache(callback: (application: SelectRowShape<ED['application']['Schema'], typeof projection>) => void) {
        const { result } = await this.cache.refresh('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            }
        });
        assert(result.length === 1);
        this.application = result[0] as any;
        callback(this.application!);
    }

    private async refresh(type: AppType, url: string, callback: (application: SelectRowShape<ED['application']['Schema'], typeof projection>) => void) {
        const { result: applicationId } = await this.getAspectWrapper().exec('getApplication', {
            url,
            type,
        });
        this.applicationId = applicationId;
        this.storage.save('application:applicationId', applicationId);
        this.getApplicationFromCache(callback);
    }

    async getApplication() {
        this.rwLock.acquire('S');
        const result = this.application!;
        this.rwLock.release();
        return result;
    }

    getApplicationId() {
        this.rwLock.acquire('S');
        const result = this.applicationId;
        this.rwLock.release();
        return result!;
    }
}