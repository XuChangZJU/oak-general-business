import { EntityDict } from '../oak-app-domain';
import { AppType } from '../oak-app-domain/Application/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { MediaType, MaterialType } from '../types/WeChat';
import { WebEnv } from 'oak-domain/lib/types/Environment';
import { File } from 'formidable';
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
    file: File;
    type: MediaType;
    isPermanent?: string;
    description?: string;
    extraFileId?: string;
}, // FormData表单提交 isPermanent 变成 'true' | 'false'
context: Cxt): Promise<{
    mediaId: string;
}>;
export declare function getMaterial<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    mediaId: string;
    isPermanent?: boolean;
}, context: Cxt): Promise<any>;
export declare function deleteMaterial<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    mediaId: string;
}, context: Cxt): Promise<any>;
export declare function batchGetArticle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    offset?: number;
    count: number;
    noContent?: 0 | 1;
}, context: Cxt): Promise<any>;
export declare function getArticle<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    articleId: string;
}, context: Cxt): Promise<any>;
export declare function batchGetMaterialList<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    applicationId: string;
    type: MaterialType;
    offset?: number;
    count: number;
}, context: Cxt): Promise<any>;
