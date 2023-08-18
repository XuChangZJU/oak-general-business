import { WebEnv, WechatMpEnv } from 'oak-domain/lib/types/Environment';
import { AppType } from '../oak-app-domain/Application/Schema';
import { EntityDict } from '../oak-app-domain';
import { QiniuUploadInfo } from 'oak-frontend-base/lib/types/Upload';
import { Config, Origin } from '../types/Config';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';

export type GeneralAspectDict<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
> = {
    mergeUser: (
        params: { from: string; to: string },
        context: Cxt
    ) => Promise<void>;
    refreshWechatPublicUserInfo: (params: {}, context: Cxt) => Promise<void>;
    getWechatMpUserPhoneNumber: (
        params: { code: string; env: WechatMpEnv },
        context: Cxt
    ) => Promise<string>;
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
            wechatLoginId,
        }: {
            code: string;
            env: WebEnv;
            wechatLoginId?: string;
        },
        context: Cxt
    ) => Promise<string>;
    logout: ({ }, context: Cxt) => Promise<void>;
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
    wakeupParasite: (
        params: {
            id: string;
            env: WebEnv | WechatMpEnv;
        },
        context: Cxt
    ) => Promise<string>;
    getUploadInfo: (
        params: { origin: Origin; bucket?: string; key?: string },
        context: Cxt
    ) => Promise<QiniuUploadInfo>;

    sendCaptcha: (params: {
        mobile: string;
        env: WechatMpEnv | WebEnv;
        type: 'login' | 'changePassword';
    }, context: Cxt) => Promise<string>;
    getApplication: (
        params: {
            type: AppType;
            domain: string;
        },
        context: Cxt
    ) => Promise<string>;
    signatureJsSDK: (
        params: {
            url: string;
            env: WebEnv;
        },
        context: Cxt
    ) => Promise<{
        signature: any;
        noncestr: string;
        timestamp: number;
        appId: string;
    }>;
    updateConfig: (
        params: {
            entity: 'platform' | 'system';
            entityId: string;
            config: Config;
        },
        context: Cxt
    ) => Promise<void>;
    updateApplicationConfig: (
        params: {
            entity: 'application';
            entityId: string;
            config: EntityDict['application']['Schema']['config'];
        },
        context: Cxt
    ) => Promise<void>;
    switchTo: (
        params: {
            userId: string;
        },
        context: Cxt
    ) => Promise<void>;
    getMpUnlimitWxaCode: (
        wechatQrCodeId: string,
        context: Cxt
    ) => Promise<string>;
    createWechatLogin: (
        params: {
            type: EntityDict['wechatLogin']['Schema']['type'];
            interval: number;
        },
        context: Cxt
    ) => Promise<string>;
    unbindingWechat: (
        params: {
            wechatUserId: string;
            captcha?: string;
            mobile?: string;
        },
        context: Cxt
    ) => Promise<void>;
    loginByWechat: (
        params: {
            wechatLoginId: string;
            env: WebEnv;
        },
        context: Cxt
    ) => Promise<string>;
    getInfoByUrl: (params: { url: string }) => Promise<{
        title: string;
        publishDate: number | undefined;
        imageList: string[];
    }>;
    getChangePasswordChannels: (
        params: { userId: string },
        context: Cxt
    ) => Promise<string[]>;
    updateUserPassword: (
        params: { userId: string, prevPassword?: string, mobile?: string, captcha?: string, newPassword: string },
        context: Cxt
    ) => Promise<{ result: string, times?: number }>;
};

export default GeneralAspectDict;
