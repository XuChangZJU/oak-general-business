import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { Config } from '../types/Config';
export declare function updateConfig<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(params: {
    entity: 'platform' | 'system';
    entityId: string;
    config: Config;
}, context: Cxt): Promise<void>;
