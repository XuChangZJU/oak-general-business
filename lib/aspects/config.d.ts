import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { Config } from '../types/Config';
export declare function updateConfig<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: 'platform' | 'system';
    entityId: string;
    config: Config;
}, context: Cxt): Promise<void>;
export declare function updateApplicationConfig<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: 'application';
    entityId: string;
    config: EntityDict['application']['Schema']['config'];
}, context: Cxt): Promise<void>;
