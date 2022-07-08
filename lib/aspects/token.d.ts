import { GeneralRuntimeContext } from '../RuntimeContext';
import { EntityDict } from 'general-app-domain';
import { WechatMpConfig } from 'general-app-domain/Application/Schema';
import { WebEnv, WechatMpEnv } from 'general-app-domain/Token/Schema';
export declare function loginMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    code: string;
}, context: Cxt): Promise<string>;
export declare function loginByPassword<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>(params: {
    password: string;
    mobile: string;
}, context: Cxt): Promise<string>;
export declare function loginWechatMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string>;
/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0
 * @param context
 */
export declare function syncUserInfoWechatMp<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>({ nickname, avatarUrl, encryptedData, iv, signature }: {
    nickname: string;
    avatarUrl: string;
    encryptedData: string;
    iv: string;
    signature: string;
}, context: Cxt): Promise<void>;
export declare function sendCaptcha<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>>({ mobile, env }: {
    mobile: string;
    env: WechatMpConfig | WebEnv;
}, context: Cxt): Promise<string>;
