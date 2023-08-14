import { EntityDict } from "../oak-app-domain";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
export declare function unbindingWechat<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    wechatUserId: string;
    captcha?: string;
    mobile?: string;
}, context: Cxt): Promise<void>;
