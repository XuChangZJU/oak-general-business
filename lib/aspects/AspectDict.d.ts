import { WebEnv, WechatMpEnv } from "general-app-domain/Token/Schema";
import { EntityDict } from "general-app-domain";
import { QiniuUploadInfo } from "oak-frontend-base/src/types/Upload";
import { GeneralRuntimeContext } from "..";
declare type GeneralAspectDict<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>> = {
    loginByPassword: (params: {
        password: string;
        mobile: string;
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
};
export declare type AspectDict<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt>;
export {};
