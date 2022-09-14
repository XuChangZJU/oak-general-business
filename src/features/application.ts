import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { CommonAspectDict } from 'oak-common-aspect';
import { assert } from 'oak-domain/lib/utils/assert';

import { EntityDict } from '../general-app-domain';
import { AppType } from '../general-app-domain/Application/Schema';
import { AspectDict } from '../aspects/AspectDict';
import { RuntimeContext } from '../context/RuntimeContext';

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

export class Application<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private applicationId?: string;
    private application?: SelectRowShape<ED['application']['Schema'], typeof projection>;
    private rwLock: RWLock;
    private cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;

    constructor(
        aspectWrapper: AspectWrapper<ED, Cxt, AD>,
        type: AppType,
        cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
        storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>) {
        super(aspectWrapper);
        this.rwLock = new RWLock();
        this.cache = cache;
        this.storage = storage;
        const applicationId = storage.load('application:applicationId');
        this.rwLock.acquire('X');
        if (applicationId) {
            this.applicationId = applicationId;
        }
        else {
            this.refresh(type);
        }
        this.rwLock.release();
    }

    private async getApplicationFromCache() {
        const data = await this.cache.get('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            }
        } as any);
        assert(data.length === 1);
        this.application = data[0];
    }

    private async refresh(type: AppType) {
        const { result: applicationId } = await this.getAspectWrapper().exec('getApplication', {
            type,
        });
        this.applicationId = applicationId;
        this.storage.save('application:applicationId', applicationId);
        this.getApplicationFromCache();
    }

    async getApplication() {
        await this.rwLock.acquire('S');
        const result = this.application!;
        this.rwLock.release();
        return result;
    }

    async getApplicationId(noWait?: true) {
        if (noWait) {
            return this.applicationId!;
        }
        await this.rwLock.acquire('S');
        const result = this.applicationId;
        this.rwLock.release();
        return result!;
    }
}