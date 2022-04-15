import { EntityDict, OperateParams } from 'oak-domain/lib/types/Entity';
import { RuntimeContext } from '../types/RuntimeContext';
export declare function operate<ED extends EntityDict, T extends keyof ED>(options: {
    entity: T;
    operation: ED[T]['Operation'];
    params?: OperateParams;
}, context: RuntimeContext<ED>): Promise<import("oak-domain/lib/types/Entity").OperationResult>;
export declare function select<ED extends EntityDict, T extends keyof ED>(options: {
    entity: T;
    selection: ED[T]['Selection'];
    params?: object;
}, context: RuntimeContext<ED>): Promise<import("oak-domain/lib/types/Entity").SelectionResult2<ED[T]["Schema"], ED[T]["Selection"]["data"]>>;
