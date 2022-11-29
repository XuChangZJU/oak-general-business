import { WebEnv, WechatMpEnv } from "../general-app-domain/Token/Schema";
import { AppType } from '../general-app-domain/Application/Schema';
import { EntityDict } from "../general-app-domain";
import { QiniuUploadInfo } from "oak-frontend-base/lib/types/Upload";
import { Config, Origin } from "../types/Config";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";
import { CommonAspectDict } from "oak-common-aspect";
import { FrontendRuntimeContext } from "../context/FrontendRuntimeContext";


type GeneralAspectDict<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
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
        params: { origin: Origin; bucket?: string; key?: string },
        context: Cxt
    ) => Promise<QiniuUploadInfo>;

    sendCaptcha: (params: {
        mobile: string;
        env: WechatMpEnv | WebEnv;
    }) => Promise<string>;
    getApplication: (
        params: {
            type: AppType;
            domain: string;
        },
        context: Cxt
    ) => Promise<string>;
    updateConfig: (
        params: {
            entity: 'platform' | 'system';
            entityId: string;
            config: Config;
        },
        context: Cxt
    ) => Promise<void>;
};

export type AspectDict<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt>;