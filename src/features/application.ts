import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { assert } from 'oak-domain/lib/utils/assert';
import { merge } from 'oak-domain/lib/utils/lodash';

import { EntityDict } from '../oak-app-domain';
import { AppType } from '../oak-app-domain/Application/Schema';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';

import { applicationProjection } from '../types/projection';

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
    private projection: EntityDict['application']['Selection']['data'];

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
        this.projection = applicationProjection;
    }

    private async refresh() {
        const { data } = await this.cache.refresh('application', {
            data: this.projection,
            filter: {
                id: this.applicationId!,
            },
        });
        assert(
            data.length === 1,
            `refresh:applicationId${this.applicationId}没有取到有效数据`
        );
        this.application = data[0];
        if (this.application!.type !== this.type) {
            this.storage.remove('application:applicationId');
        }
    }

    private getApplicationFromCache() {
        const data = this.cache.get('application', {
            data: this.projection,
            filter: {
                id: this.applicationId,
            },
        } as any);
        assert(
            data.length === 1,
            `cache:applicationId${this.applicationId}没有取到有效数据`
        );
        this.application = data[0];
    }

    private async loadApplicationInfo(type: AppType, domain: string) {
        const { result: applicationId } = await this.cache.exec(
            'getApplication',
            {
                type,
                domain,
            }
        );
        this.applicationId = applicationId;
        this.getApplicationFromCache();

        // 如果取得的type和当前环境不同，则不缓存id(未来可能有type相同的appliction上线)
        if (this.application?.type === type) {
            this.storage.save('application:applicationId', applicationId);
        }
        this.publish();
    }

    async initialize(
        appId?: string | null,
        projection?: EntityDict['application']['Selection']['data']
    ) {
        //接收外层注入的projection
        this.projection = merge(this.projection, projection);
        if (process.env.NODE_ENV === 'development' && appId) {
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
        return this.application;
    }

    getApplicationId() {
        return this.applicationId;
    }
}