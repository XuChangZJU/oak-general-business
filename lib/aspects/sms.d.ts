import { EntityDict } from '../oak-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function syncSmsTemplate<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    origin: string;
    systemId: string;
}, context: Cxt): Promise<void>;
