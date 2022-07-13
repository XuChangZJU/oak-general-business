import { EntityDict } from 'general-app-domain';
import { AppType } from 'general-app-domain/Application/Schema';
import { Action, Feature } from 'oak-frontend-base';
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

    constructor(
        aspectWrapper: AspectWrapper<ED, Cxt, AD>,
        type: AppType,
        url: string,
        cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
        callback: (application: SelectRowShape<ED['application']['Schema'], typeof projection>) => void) {
        super(aspectWrapper);
        this.rwLock = new RWLock();
        this.cache = cache;
        this.refresh(type, url, callback);
    }

    private async refresh(type: AppType, url: string, callback: (application: SelectRowShape<ED['application']['Schema'], typeof projection>) => void) {
        this.rwLock.acquire('X');
        const { result: applicationId } = await this.getAspectWrapper().exec('getApplication', {
            url,
            type,
        });
        this.applicationId = applicationId;
        const result = await this.cache.get('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            }
        });
        assert(result.length === 1);
        this.application = result[0] as any;
        this.rwLock.release();
        callback(this.application!);
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