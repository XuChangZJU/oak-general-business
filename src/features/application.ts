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
    style: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
        platformId: 1,
        style: 1,
        folder: 1,
        platform: {
            id: 1,
            config: 1,
            style: 1,
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

    private async refresh() {
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

    private async loadApplicationInfo(type: AppType, domain: string) {
        const applicationId = await this.cache.exec('getApplication', {
            type,
            domain,
        });
        this.applicationId = applicationId;
        this.storage.save('application:applicationId', applicationId);
        this.getApplicationFromCache();
        this.publish();
    }

    async initialize(appId?: string | null) {
        if (process.env.NODE_ENV === 'development'  && appId) {
            // development环境下允许注入一个线上的appId
            this.applicationId = appId;
        }
        if (this.applicationId) {
            await this.refresh();
        } else {
            await this.loadApplicationInfo(this.type, this.domain);
        }
    }

    getApplication() {
        return this.application!;
    }

    getApplicationId() {
        return this.applicationId;
    }
}