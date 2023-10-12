import { WebEnv, WechatMpEnv } from 'oak-domain/lib/types/Environment';
import { AppType } from '../oak-app-domain/Application/Schema';
import { EntityDict } from '../oak-app-domain';
import { Config } from '../types/Config';
import { Style } from '../types/Style';
import { MenuType } from '../types/WeChat';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { WechatPublicEventData, WechatMpEventData } from 'oak-external-sdk';
export type GeneralAspectDict<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>> = {
    mergeUser: (params: {
        from: string;
        to: string;
    }, context: Cxt) => Promise<void>;
    refreshWechatPublicUserInfo: (params: {}, context: Cxt) => Promise<void>;
    getWechatMpUserPhoneNumber: (params: {
        code: string;
        env: WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    loginByMobile: (params: {
        captcha?: string;
        password?: string;
        mobile: string;
        env: WebEnv | WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    loginWechat: ({ code, env, wechatLoginId, }: {
        code: string;
        env: WebEnv;
        wechatLoginId?: string;
    }, context: Cxt) => Promise<string>;
    logout: ({}: {}, context: Cxt) => Promise<void>;
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
    wakeupParasite: (params: {
        id: string;
        env: WebEnv | WechatMpEnv;
    }, context: Cxt) => Promise<string>;
    sendCaptcha: (params: {
        mobile: string;
        env: WechatMpEnv | WebEnv;
        type: 'login' | 'changePassword' | 'confirm';
    }, context: Cxt) => Promise<string>;
    getApplication: (params: {
        type: AppType;
        domain: string;
    }, context: Cxt) => Promise<string>;
    signatureJsSDK: (params: {
        url: string;
        env: WebEnv;
    }, context: Cxt) => Promise<{
        signature: any;
        noncestr: string;
        timestamp: number;
        appId: string;
    }>;
    updateConfig: (params: {
        entity: 'platform' | 'system';
        entityId: string;
        config: Config;
    }, context: Cxt) => Promise<void>;
    updateStyle: (params: {
        entity: 'platform' | 'system' | 'application';
        entityId: string;
        style: Style;
    }, context: Cxt) => Promise<void>;
    updateApplicationConfig: (params: {
        entity: 'application';
        entityId: string;
        config: EntityDict['application']['Schema']['config'];
    }, context: Cxt) => Promise<void>;
    switchTo: (params: {
        userId: string;
    }, context: Cxt) => Promise<void>;
    getMpUnlimitWxaCode: (wechatQrCodeId: string, context: Cxt) => Promise<string>;
    createWechatLogin: (params: {
        type: EntityDict['wechatLogin']['Schema']['type'];
        interval: number;
    }, context: Cxt) => Promise<string>;
    unbindingWechat: (params: {
        wechatUserId: string;
        captcha?: string;
        mobile?: string;
    }, context: Cxt) => Promise<void>;
    loginByWechat: (params: {
        wechatLoginId: string;
        env: WebEnv;
    }, context: Cxt) => Promise<string>;
    getInfoByUrl: (params: {
        url: string;
    }) => Promise<{
        title: string;
        publishDate: number | undefined;
        imageList: string[];
    }>;
    getChangePasswordChannels: (params: {
        userId: string;
    }, context: Cxt) => Promise<string[]>;
    updateUserPassword: (params: {
        userId: string;
        prevPassword?: string;
        mobile?: string;
        captcha?: string;
        newPassword: string;
    }, context: Cxt) => Promise<{
        result: string;
        times?: number;
    }>;
    uploadWechatMedia: (params: any, context: Cxt) => Promise<{
        mediaId: string;
    }>;
    getCurrentMenu: (params: {
        applicationId: string;
    }, context: Cxt) => Promise<any>;
    getMenu: (params: {
        applicationId: string;
    }, context: Cxt) => Promise<any>;
    createMenu: (params: {
        applicationId: string;
        menuConfig: any;
        id: string;
    }, context: Cxt) => Promise<any>;
    createConditionalMenu: (params: {
        applicationId: string;
        menuConfig: any;
        id: string;
    }, context: Cxt) => Promise<any>;
    deleteConditionalMenu: (params: {
        applicationId: string;
        menuId: number;
    }, context: Cxt) => Promise<any>;
    deleteMenu: (params: {
        applicationId: string;
    }, context: Cxt) => Promise<any>;
    batchGetArticle: (params: {
        applicationId: string;
        offset?: number;
        count: number;
        noContent?: 0 | 1;
    }, context: Cxt) => Promise<any>;
    getArticle: (params: {
        applicationId: string;
        articleId: string;
    }, context: Cxt) => Promise<any>;
    batchGetMaterialList: (params: {
        applicationId: string;
        type: MenuType;
        offset?: number;
        count: number;
    }, context: Cxt) => Promise<any>;
    getMaterial: (params: {
        applicationId: string;
        type: MenuType;
        mediaId: string;
    }, context: Cxt) => Promise<any>;
    createSession: (params: {
        data?: WechatPublicEventData | WechatMpEventData;
        type: AppType;
        entity?: string;
        entityId?: string;
    }, context: Cxt) => Promise<string>;
    createTag: (params: {
        applicationId: string;
        name: string;
    }, context: Cxt) => Promise<any>;
    getTags: (params: {
        applicationId: string;
    }, context: Cxt) => Promise<any>;
    editTag: (params: {
        applicationId: string;
        id: number;
        name: string;
    }, context: Cxt) => Promise<any>;
    deleteTag: (params: {
        applicationId: string;
        id: string;
        wechatId: number;
    }, context: Cxt) => Promise<any>;
    syncMessageTemplate: (params: {
        applicationId: string;
    }, context: Cxt) => Promise<any>;
    syncTag: (params: {
        applicationId: string;
        id: string;
    }, context: Cxt) => Promise<any>;
    oneKeySync: (params: {
        applicationId: string;
    }, context: Cxt) => Promise<any>;
    getTagUsers: (params: {
        applicationId: string;
        tagId: number;
    }, context: Cxt) => Promise<any>;
    batchtagging: (params: {
        applicationId: string;
        openIdList: string[];
        tagId: number;
    }, context: Cxt) => Promise<any>;
    batchuntagging: (params: {
        applicationId: string;
        openIdList: string[];
        tagId: number;
    }, context: Cxt) => Promise<any>;
    getUserTags: (params: {
        applicationId: string;
        openId: string;
    }, context: Cxt) => Promise<any>;
    getUsers: (params: {
        applicationId: string;
        nextOpenId: string;
    }, context: Cxt) => Promise<any>;
    tagging: (params: {
        applicationId: string;
        openId: string;
        tagIdList: number[];
    }, context: Cxt) => Promise<any>;
    syncToLocale: (params: {
        applicationId: string;
        openId: string;
    }, context: Cxt) => Promise<any>;
    syncToWechat: (params: {
        applicationId: string;
        id: string;
        openId: string;
    }, context: Cxt) => Promise<any>;
};
export default GeneralAspectDict;
