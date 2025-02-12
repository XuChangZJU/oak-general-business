import { EntityDict } from '../oak-app-domain';
import { NativeEnv, WebEnv, WechatMpEnv } from 'oak-domain/lib/types/Environment';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
export declare function loginByMobile<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    captcha?: string;
    password?: string;
    mobile: string;
    disableRegister?: boolean;
    env: WebEnv | WechatMpEnv | NativeEnv;
}, context: Cxt): Promise<string>;
export declare function refreshWechatPublicUserInfo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({}: {}, context: Cxt): Promise<void>;
export declare function loginByWechat<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    wechatLoginId: string;
    env: WebEnv | WechatMpEnv;
}, context: Cxt): Promise<string>;
/**
 * 公众号授权登录
 * @param param0
 * @param context
 */
export declare function loginWechat<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env, wechatLoginId, }: {
    code: string;
    env: WebEnv;
    wechatLoginId?: string;
}, context: Cxt): Promise<string>;
/**
 * 小程序授权登录
 * @param param0
 * @param context
 * @returns
 */
export declare function loginWechatMp<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env, }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string>;
/**
 * 同步从wx.getUserProfile拿到的用户信息
 * @param param0
 * @param context
 */
export declare function syncUserInfoWechatMp<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ nickname, avatarUrl, encryptedData, iv, signature, }: {
    nickname: string;
    avatarUrl: string;
    encryptedData: string;
    iv: string;
    signature: string;
}, context: Cxt): Promise<void>;
export declare function sendCaptcha<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ mobile, env, type: type2, }: {
    mobile: string;
    env: WechatMpEnv | WebEnv | NativeEnv;
    type: 'login' | 'changePassword' | 'confirm';
}, context: Cxt): Promise<string>;
export declare function switchTo<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ userId }: {
    userId: string;
}, context: Cxt): Promise<void>;
export declare function getWechatMpUserPhoneNumber<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>({ code, env }: {
    code: string;
    env: WechatMpEnv;
}, context: Cxt): Promise<string>;
export declare function logout<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    tokenValue: string;
}, context: Cxt): Promise<void>;
/**
 * 创建一个当前parasite上的token
 * @param params
 * @param context
 * @returns
 */
export declare function wakeupParasite<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    id: string;
    env: WebEnv | WechatMpEnv | NativeEnv;
}, context: Cxt): Promise<string>;
export declare function refreshToken<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>>(params: {
    env: WebEnv | WechatMpEnv | NativeEnv;
    tokenValue: string;
}, context: Cxt): Promise<string>;
