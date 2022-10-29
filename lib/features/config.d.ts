import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper } from 'oak-domain/lib/types';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { Config as ConfigDef } from '../types/Config';
export declare class Config<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature {
    private aspectWrapper;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD>);
    updateConfig(entity: 'platform' | 'system', entityId: string, config: ConfigDef): Promise<void>;
}
