import { EntityDict } from "general-app-domain";
import { AppType } from "general-app-domain/Application/Schema";
import { GeneralRuntimeContext } from "../RuntimeContext";
export declare function getApplication<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    type: AppType;
}, context: Cxt): Promise<string>;
