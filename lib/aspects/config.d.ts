import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { Config } from '../types/Config';
import { Style } from '../types/Style';
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
export declare function updateStyle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: 'platform' | 'system';
    entityId: string;
    style: Style;
}, context: Cxt): Promise<void>;
