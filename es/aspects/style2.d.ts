import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { EntityDict } from '../oak-app-domain';
import { Style } from '../types/Style';
export declare function updateStyle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    entity: 'platform' | 'system';
    entityId: string;
    style: Style;
}, context: Cxt): Promise<void>;
