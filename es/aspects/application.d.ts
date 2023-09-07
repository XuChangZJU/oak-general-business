import { EntityDict } from "../oak-app-domain";
import { AppType } from "../oak-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
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
