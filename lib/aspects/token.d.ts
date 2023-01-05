import { EntityDict } from '../general-app-domain';
import { WechatMpConfig } from '../general-app-domain/Application/Schema';
import { WebEnv, WechatMpEnv } from '../general-app-domain/Token/Schema';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function loginByMobile<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    captcha?: string;
    password?: string;
    mobile: string;
    env: WebEnv | WechatMpEnv;
}, context: Cxt): Promise<string>;
/**
 * 公众号授权登录
 * @param param0
 * @param context
 */
export declare function loginWechat<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WebEnv;
}, context: Cxt): Promise<string>;
/**
 * 小程序授权登录
 * @param param0
 * @param context
 * @returns
 */
export declare function loginWechatMp<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string>;
/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0
 * @param context
 */
export declare function syncUserInfoWechatMp<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ nickname, avatarUrl, encryptedData, iv, signature }: {
    nickname: string;
    avatarUrl: string;
    encryptedData: string;
    iv: string;
    signature: string;
}, context: Cxt): Promise<void>;
export declare function sendCaptcha<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ mobile, env }: {
    mobile: string;
    env: WechatMpConfig | WebEnv;
}, context: Cxt): Promise<string>;
export declare function switchTo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ userId }: {
    userId: string;
}, context: Cxt): Promise<void>;
