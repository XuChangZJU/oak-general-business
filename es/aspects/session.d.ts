import { EntityDict } from "../oak-app-domain";
import { AppType } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
export declare function createSession<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    data?: WechatPublicEventData | WechatMpEventData;
    type: AppType;
    entity?: string;
    entityId?: string;
}, context: Cxt): Promise<string | undefined>;
