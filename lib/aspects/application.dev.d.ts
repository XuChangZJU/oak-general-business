import { EntityDict } from '../general-app-domain';
import { AppType } from '../general-app-domain/Application/Schema';
import { RuntimeContext } from '../context/RuntimeContext';
export declare function getApplication<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(params: {
    type: AppType;
}, context: Cxt): Promise<string>;
