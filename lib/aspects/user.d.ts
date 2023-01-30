import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../general-app-domain";
export declare function mergeUser<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    from: string;
    to: string;
}, context: Cxt, innerLogic?: boolean): Promise<void>;
