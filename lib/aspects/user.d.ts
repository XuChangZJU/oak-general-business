import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../oak-app-domain";
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
export declare function mergeUser<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    from: string;
    to: string;
}, context: Cxt, innerLogic?: boolean): Promise<void>;
export declare function getChangePasswordChannels<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    userId: string;
}, context: Cxt, innerLogic?: boolean): Promise<never[]>;
