import { EntityDict } from "../general-app-domain";
import { AppType } from "../general-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
export declare function getApplication<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    type: AppType;
    domain: string;
}, context: Cxt): Promise<string>;
