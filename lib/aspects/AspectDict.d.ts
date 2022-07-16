import { WebEnv, WechatMpEnv } from "general-app-domain/Token/Schema";
import { AppType } from 'general-app-domain/Application/Schema';
import { EntityDict } from "general-app-domain";
import { QiniuUploadInfo } from "oak-frontend-base/src/types/Upload";
import { GeneralRuntimeContext } from "../RuntimeContext";
declare type GeneralAspectDict<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>> = {
    loginByMobile: (params: {
        captcha?: string;
        password?: string;
        mobile: string;
        env: WebEnv | WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    loginMp: (params: {
        code: string;
    }, context: Cxt) => Promise<string>;
    loginWechatMp: ({ code, env }: {
        code: string;
        env: WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    syncUserInfoWechatMp: ({ nickname, avatarUrl, encryptedData, iv, signature }: {
        nickname: string;
        avatarUrl: string;
        encryptedData: string;
        iv: string;
        signature: string;
    }, context: Cxt) => Promise<void>;
    getUploadInfo: (params: {
        origin: string;
        fileName: string;
    }, context: Cxt) => Promise<QiniuUploadInfo>;
    sendCaptcha: (params: {
        mobile: string;
        env: WechatMpEnv | WebEnv;
    }) => Promise<string>;
    getApplication: (params: {
        type: AppType;
    }, context: Cxt) => Promise<string>;
};
export declare type AspectDict<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt>;
export {};
