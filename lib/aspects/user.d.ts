import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../general-app-domain";
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
export declare function mergeUser<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    from: string;
    to: string;
}, context: Cxt, innerLogic?: boolean): Promise<void>;
