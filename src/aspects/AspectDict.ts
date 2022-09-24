import { WebEnv, WechatMpEnv } from "../general-app-domain/Token/Schema";
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from "../general-app-domain";
import { QiniuUploadInfo } from "oak-frontend-base/lib/types/Upload";
import { RuntimeContext } from '../context/RuntimeContext';
import { Schema as Livestream } from '../general-app-domain/Livestream/Schema';


type GeneralAspectDict<
    ED extends EntityDict,
    Cxt extends RuntimeContext<ED>
> = {
    loginByMobile: (
        params: {
            captcha?: string;
            password?: string;
            mobile: string;
            env: WebEnv | WechatMpEnv;
        },
        context: Cxt
    ) => Promise<string>;
    loginWechat: (
        {
            code,
            env,
        }: {
            code: string;
            env: WebEnv;
        },
        context: Cxt
    ) => Promise<string>;
    loginWechatMp: (
        {
            code,
            env,
        }: {
            code: string;
            env: WechatMpEnv;
        },
        context: Cxt
    ) => Promise<string>;
    syncUserInfoWechatMp: (
        {
            nickname,
            avatarUrl,
            encryptedData,
            iv,
            signature,
        }: {
            nickname: string;
            avatarUrl: string;
            encryptedData: string;
            iv: string;
            signature: string;
        },
        context: Cxt
    ) => Promise<void>;
    getUploadInfo: (
        params: { origin: string; key?: string },
        context: Cxt
    ) => Promise<QiniuUploadInfo>;
    getLivestream: (
        params: {
            streamTitle: string;
            expireAt: number;
        },
        context: Cxt
    ) => Promise<
        Pick<
            Livestream,
            | 'streamTitle'
            | 'hub'
            | 'rtmpPushUrl'
            | 'rtmpPlayUrl'
            | 'pcPushUrl'
            | 'streamKey'
            | 'expireAt'
        >
    >;
    getLivestream2: (
        params: {
            streamTitle: string;
            expireAt: number;
        },
        context: Cxt
    ) => Promise<
        Pick<
            Livestream,
            | 'streamTitle'
            | 'hub'
            | 'rtmpPushUrl'
            | 'rtmpPlayUrl'
            | 'pcPushUrl'
            | 'streamKey'
            | 'expireAt'
        >
    >;
        getPlayBackUrl: (
            params: {
                streamTitle: string,
                start: number,
                end: number,
            },
            context: Cxt
        ) => Promise<string>;
    sendCaptcha: (params: {
        mobile: string;
        env: WechatMpEnv | WebEnv;
    }) => Promise<string>;
    getApplication: (
        params: {
            type: AppType;
        },
        context: Cxt
    ) => Promise<string>;
};

export type AspectDict<ED extends EntityDict, Cxt extends RuntimeContext<ED>> = GeneralAspectDict<ED, Cxt>;