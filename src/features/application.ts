import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { assert } from 'oak-domain/lib/utils/assert';

import { EntityDict } from '../general-app-domain';
import { AppType } from '../general-app-domain/Application/Schema';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';

const projection: EntityDict['application']['Selection']['data'] = {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
        platformId: 1,
        platform: {
            id: 1,
            config: 1,
        },
    }
};

export class Application<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private type: AppType;
    private domain: string; //域名
    private applicationId?: string;
    private application?: Partial<EntityDict['application']['Schema']>;
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage;

    constructor(
        type: AppType,
        domain: string,
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>,
        storage: LocalStorage
    ) {
        super();
        this.cache = cache;
        this.storage = storage;
        const applicationId = storage.load('application:applicationId');
        this.applicationId = applicationId;
        this.type = type;
        this.domain = domain;
    }

    private async loadApplicationInfo() {
        const { data } = await this.cache.refresh('application', {
            data: projection,
            filter: {
                id: this.applicationId!,
            },
        });
        assert(
            data.length === 1,
            `applicationId${this.applicationId}没有取到有效数据`
        );
        this.application = data[0];
    }

    private getApplicationFromCache() {
        const data = this.cache.get('application', {
            data: projection,
            filter: {
                id: this.applicationId,
            },
        } as any);
        assert(
            data.length === 1,
            `applicationId${this.applicationId}没有取到有效数据`
        );
        this.application = data[0];
    }

    private async refresh(type: AppType, domain: string) {
        const applicationId = await this.cache.exec('getApplication', {
            type,
            domain,
        });
        this.applicationId = applicationId;
        this.storage.save('application:applicationId', applicationId);
        this.getApplicationFromCache();
        this.publish();
    }

    async initialize() {
        if (this.applicationId) {
            await this.loadApplicationInfo();
        } else {
            await this.refresh(this.type, this.domain);
        }
    }

    getApplication() {
        return this.application!;
    }

    getApplicationId() {
        return this.applicationId;
    }
}