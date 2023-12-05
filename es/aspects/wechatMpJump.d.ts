import { EntityDict } from "../oak-app-domain";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
export declare function wechatMpJump<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    jump_wxa: {
        path?: string;
        query?: string;
        env_version?: string;
    };
    expireType?: number;
    expiresAt?: number;
    expireInterval?: number;
}, context: Cxt): Promise<any>;
