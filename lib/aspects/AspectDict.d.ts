import { WebEnv, WechatMpEnv } from "../general-app-domain/Token/Schema";
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from "../general-app-domain";
import { QiniuUploadInfo } from "oak-frontend-base/lib/types/Upload";
import { GeneralRuntimeContext } from "../RuntimeContext";
import { Datetime } from 'oak-domain/lib/types/DataType';
import { Schema as Livestream } from '../general-app-domain/Livestream/Schema';
declare type GeneralAspectDict<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>> = {
    loginByMobile: (params: {
        captcha?: string;
        password?: string;
        mobile: string;
        env: WebEnv | WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    loginWechat: ({ code, env, }: {
        code: string;
        env: WebEnv;
    }, context: Cxt) => Promise<string>;
    loginWechatMp: ({ code, env, }: {
        code: string;
        env: WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    syncUserInfoWechatMp: ({ nickname, avatarUrl, encryptedData, iv, signature, }: {
        nickname: string;
        avatarUrl: string;
        encryptedData: string;
        iv: string;
        signature: string;
    }, context: Cxt) => Promise<void>;
    getUploadInfo: (params: {
        origin: string;
        key?: string;
    }, context: Cxt) => Promise<QiniuUploadInfo>;
    getLivestream: (params: {
        streamTitle: string;
        expireAt: Datetime;
    }, context: Cxt) => Promise<Pick<Livestream, 'streamTitle' | 'hub' | 'rtmpPushUrl' | 'rtmpPlayUrl' | 'pcPushUrl' | 'streamKey' | 'expireAt'>>;
    getLivestream2: (params: {
        streamTitle: string;
        expireAt: Datetime;
    }, context: Cxt) => Promise<Pick<Livestream, 'streamTitle' | 'hub' | 'rtmpPushUrl' | 'rtmpPlayUrl' | 'pcPushUrl' | 'streamKey' | 'expireAt'>>;
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
