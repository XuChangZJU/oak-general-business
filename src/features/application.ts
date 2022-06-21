import { EntityDict } from 'general-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, AspectWrapper, Context, SelectRowShape } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { Cache } from 'oak-frontend-base';
import assert from 'assert';

import { AspectDict } from '../aspects/aspectDict';
import { GeneralRuntimeContext } from '..';

const projection : {    
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

export class Application<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD> {
    private applicationId: string;
    private application?: SelectRowShape<ED['application']['Schema'], typeof projection>;
    private rwLock: RWLock;
    private cache: Cache<ED, Cxt, AD>;

    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD>, applicationId: string, cache: Cache<ED, Cxt, AD>) {
        super(aspectWrapper);
        this.rwLock = new RWLock();
        this.applicationId = applicationId;
        this.cache = cache;
    }

    private async refresh() {
        this.rwLock.acquire('X');
        const { result } = await this.cache!.refresh('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            }
        });
        assert(result.length === 1);
        this.application = result[0] as any;
        this.rwLock.release();
    }

    getApplication() {
        this.rwLock.acquire('S');
        const result = this.application!;
        this.rwLock.release();
        return result;
    }

    getApplicationId() {
        this.rwLock.acquire('S');
        const result = this.applicationId;
        this.rwLock.release();
        return result;
    }
}