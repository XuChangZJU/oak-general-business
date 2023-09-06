import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { EntityDict } from "../oak-app-domain";
import { WebEnv, WechatMpEnv } from 'oak-domain/lib/types/Environment';
export declare function confirmUserEntityGrant<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    id: string;
    env: WebEnv | WechatMpEnv;
}, context: Cxt): Promise<number>;
