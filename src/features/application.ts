import { pick } from 'lodash';
import { EntityDict } from 'oak-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, Context, SelectRowShape } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { WechatMpEnv } from 'oak-app-domain/Token/Schema';
import { Cache } from 'oak-frontend-base';
import assert from 'assert';

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

export class Application<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private applicationId?: string;
    private application?: SelectRowShape<ED['application']['Schema'], typeof projection>;
    private rwLock: RWLock;
    private cache?: Cache<ED, Cxt, AD>;

    constructor() {
        super();
        this.rwLock = new RWLock();
    }

    @Action
    async setApplicationId(id: string) {
        this.rwLock.acquire('X');
        this.applicationId = id;
        const { result } = await this.cache!.refresh('application', {
            data: projection,
            filter: {
                id,
            }
        }, 'Application:setApplicationId');
        assert(result.length === 1);
        this.application = result[0] as any;
        this.rwLock.release();
    }

    setCache(cache: Cache<ED, Cxt, AD>) {
        this.cache = cache;
    }

    getApplication() {
        this.rwLock.acquire('S');
        const result = this.application!;
        this.rwLock.release();
        return result;
    }

    getApplicationId() {
        this.rwLock.acquire('S');
        const result = this.applicationId!;
        this.rwLock.release();
        return result;
    }
}