import { Feature } from 'oak-frontend-base';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Config as ConfigDef } from '../types/Config';
import { Style as StyleDef } from '../types/Style';
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

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>
    ) {
        super();
        this.cache = cache;
    }

    async updateConfig(
        entity: 'platform' | 'system',
        entityId: string,
        config: ConfigDef
    ) {
        await this.cache.exec('updateConfig', {
            entity,
            entityId,
            config,
        });
        this.publish();
    }

    async updateApplicationConfig(
        entity: 'application',
        entityId: string,
        config: EntityDict['application']['Schema']['config']
    ) {
        await this.cache.exec('updateApplicationConfig', {
            entity,
            entityId,
            config,
        });
        this.publish();
    }

    async updateStyle(
        entity: 'platform' | 'system' | 'application',
        entityId: string,
        style: StyleDef
    ) {
        await this.cache.exec('updateStyle', {
            entity,
            entityId,
            style,
        });
        this.publish();
    }
}
