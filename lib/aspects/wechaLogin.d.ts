import { EntityDict } from "../general-app-domain";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
export declare function createWechatLogin<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    type: EntityDict['wechatLogin']['Schema']['type'];
    interval: number;
}, context: Cxt): Promise<string>;
