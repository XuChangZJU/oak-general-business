import { Feature } from 'oak-frontend-base/es/types/Feature';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Config as ConfigDef } from '../types/Config';
import { Style as StyleDef } from '../types/Style';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { CommonAspectDict } from 'oak-common-aspect';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare class Config<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>);
    updateConfig(entity: 'platform' | 'system', entityId: string, config: ConfigDef): Promise<void>;
    updateApplicationConfig(entity: 'application', entityId: string, config: EntityDict['application']['Schema']['config']): Promise<void>;
    updateStyle(entity: 'platform' | 'system' | 'application', entityId: string, style: StyleDef): Promise<void>;
}
