import { Feature } from 'oak-frontend-base';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import { Environment } from 'oak-frontend-base/es/features/environment';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare class Token<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private tokenValue?;
    private environment;
    private cache;
    private storage;
    private isLoading;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage, environment: Environment);
    loadTokenInfo(): Promise<void>;
    loginByMobile(mobile: string, password?: string, captcha?: string): Promise<void>;
    loginByWechatInWebEnv(wechatLoginId: string): Promise<void>;
    loginWechat(code: string, params?: {
        wechatLoginId?: string;
    }): Promise<void>;
    loginWechatMp(): Promise<void>;
    syncUserInfoWechatMp(): Promise<void>;
    logout(): Promise<void>;
    removeToken(): void;
    getTokenValue(): string | undefined;
    getToken(allowUnloggedIn?: boolean): Partial<ED["token"]["Schema"]> | undefined;
    getUserId(allowUnloggedIn?: boolean): NonNullable<ED["token"]["Schema"]["userId"]> | undefined;
    getUserInfo(): ED["token"]["Schema"]["user"] | undefined;
    isRoot(): boolean;
    /**
     * 这个是指token的player到底是不是root
     * @returns
     */
    isReallyRoot(): boolean;
    sendCaptcha(mobile: string, type: 'login' | 'changePassword' | 'confirm'): Promise<string>;
    switchTo(userId: string): Promise<void>;
    refreshWechatPublicUserInfo(): Promise<void>;
    getWechatMpUserPhoneNumber(code: string): Promise<void>;
    wakeupParasite(id: string): Promise<void>;
}
