import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper } from 'oak-domain/lib/types';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Config as ConfigDef } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { CommonAspectDict } from 'oak-common-aspect';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';

export class Config<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
    > extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;

    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>) {
        super();
        this.cache = cache;
    }

    async updateConfig(
        entity: 'platform' | 'system',
        entityId: string,
        config: ConfigDef,
    ) {
        await this.cache.exec('updateConfig', {
            entity,
            entityId,
            config
        });
        this.publish();
    }
}
