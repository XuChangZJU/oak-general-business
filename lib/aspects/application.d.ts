import { EntityDict } from "../oak-app-domain";
import { AppType } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { MediaType } from '../types/WeChat';
import { WebEnv } from 'oak-domain/lib/types/Environment';
export declare function getApplication<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    type: AppType;
    domain: string;
}, context: Cxt): Promise<string>;
export declare function signatureJsSDK<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ url, env }: {
    url: string;
    env: WebEnv;
}, context: Cxt): Promise<{
    signature: string;
    noncestr: string;
    timestamp: number;
    appId: string;
}>;
export declare function uploadWechatMedia<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    file: any;
    type: MediaType;
    isPermanent?: string;
    description?: string;
}, // FormData表单提交 isPermanent 变成 'true' | 'false'
context: Cxt): Promise<{
    mediaId: string;
}>;
