import { Feature } from 'oak-frontend-base';
import {
    OakRowInconsistencyException,
    OakUnloggedInException,
    OakUserUnpermittedException,
} from 'oak-domain/lib/types/Exception';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import { Environment } from 'oak-frontend-base/es/features/environment';
import { CommonAspectDict } from 'oak-common-aspect';
import { WebEnv, WechatMpEnv } from 'oak-domain/lib/types/Environment';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { tokenProjection } from '../types/Projection';
import { OakUserInfoLoadingException } from '../types/Exception';
import { LOCAL_STORAGE_KEYS } from '../config/constants';
import { cloneDeep } from 'oak-domain/lib/utils/lodash';

export class Token<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private tokenValue?: string;
    private environment: Environment;
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage;

    private async loadSavedToken() {
        let tokenValue = await this.storage.load(LOCAL_STORAGE_KEYS.token);
        /* if (!tokenValue) {
            // 历史数据，原来用的key太随意
            tokenValue = await this.storage.load('token:token');
            if (tokenValue) {
                await this.storage.save(LOCAL_STORAGE_KEYS.token, tokenValue);
                await this.storage.remove('token:token');
            }
        } */

        if (tokenValue) {
            const env = await this.environment.getEnv();
            try {
                const { result } = await this.cache.exec(
                    'refreshToken',
                    {
                        tokenValue,
                        env,
                    },
                    undefined,
                    true,
                    true
                );
                if (this.tokenValue !== result) {
                    this.tokenValue = result;
                    await this.storage.save(LOCAL_STORAGE_KEYS.token, result);                    
                }
            }
            catch (err) {
                // refresh出了任何错都无视，直接放弃此token
                console.warn(err);
                this.tokenValue = undefined;
                this.removeToken(true);
            }
        } else {
            this.tokenValue = undefined;
        }
        this.publish();
    }

    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD>,
        storage: LocalStorage,
        environment: Environment
    ) {
        super();
        this.cache = cache;
        this.storage = storage;
        this.environment = environment;
        this.tokenValue = ''; // 置个空字符串代表还在load storage缓存的数据
        this.loadSavedToken();
    }

    async loginByMobile(
        mobile: string,
        password?: string,
        captcha?: string,
        disableRegister?: boolean
    ) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec(
            'loginByMobile',
            {
                password,
                mobile,
                captcha,
                disableRegister,
                env,
            },
            undefined,
            true
        );
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }

    async loginByWechatInWebEnv(wechatLoginId: string) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginByWechat', {
            env: env as WebEnv,
            wechatLoginId,
        });
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }

    async loginWechat(code: string, params?: { wechatLoginId?: string }) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginWechat', {
            code,
            env: env as WebEnv,
            wechatLoginId: params?.wechatLoginId,
        });
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }

    async loginWechatMp() {
        const { code } = await wx.login();

        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('loginWechatMp', {
            code,
            env: env as WechatMpEnv,
        });
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }

    async syncUserInfoWechatMp() {
        const info = await wx.getUserProfile({
            desc: '同步微信昵称和头像信息',
        });

        const {
            userInfo: { nickName: nickname, avatarUrl },
            encryptedData,
            signature,
            iv,
        } = info;

        await this.cache.exec('syncUserInfoWechatMp', {
            nickname,
            avatarUrl,
            encryptedData,
            signature,
            iv,
        });
        this.publish();
    }

    async logout() {
        await this.cache.exec('logout', {
            tokenValue: this.tokenValue!,
        }, undefined, undefined, true);
        this.removeToken();
    }

    removeToken(disablePublish?: boolean) {
        this.tokenValue = undefined;
        this.storage.remove(LOCAL_STORAGE_KEYS.token);
        if (!disablePublish) {
            this.publish();
        }
    }

    getTokenValue() {
        if (this.tokenValue === '') {
            throw new OakUserInfoLoadingException();
        }
        return this.tokenValue;
    }

    getToken(allowUnloggedIn?: boolean) {
        if (this.tokenValue === '') {
            throw new OakUserInfoLoadingException();
        }
        if (this.tokenValue) {
            const token = this.cache.get('token', {
                data: cloneDeep(tokenProjection),
                filter: {
                    value: this.tokenValue!,
                },
            })[0];
            if (!token) {
                if (allowUnloggedIn) {
                    return undefined;
                }
                throw new OakUserInfoLoadingException();
            }
            return token;
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new OakUnloggedInException();
    }

    getUserId(allowUnloggedIn?: boolean) {
        const token = this.getToken(allowUnloggedIn);
        if (token?.userId) {
            return token.userId!;
        }
    }

    // getUserInfo 不要求登录
    getUserInfo() {
        const token = this.getToken(true);
        if (token?.user) {
            return token.user;
        }
    }

    isRoot(): boolean {
        const token = this.getToken(true);
        return !!token?.user?.isRoot;
    }

    /**
     * 这个是指token的player到底是不是root
     * @returns
     */
    isReallyRoot(): boolean {
        const token = this.getToken(true);
        return !!token?.player?.isRoot;
    }

    async sendCaptcha(
        mobile: string,
        type: 'login' | 'changePassword' | 'confirm'
    ) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('sendCaptcha', {
            mobile,
            env: env as WebEnv,
            type,
        });
        return result as string;
    }

    async switchTo(userId: string) {
        const currentUserId = this.getUserId();
        if (currentUserId === userId) {
            throw new OakRowInconsistencyException(
                undefined,
                '您已经是当前用户'
            );
        }
        await this.cache.exec('switchTo', {
            userId,
        });
        this.publish();
    }

    async refreshWechatPublicUserInfo() {
        await this.cache.exec('refreshWechatPublicUserInfo', {});
    }

    async getWechatMpUserPhoneNumber(code: string) {
        const env = await this.environment.getEnv();
        await this.cache.exec('getWechatMpUserPhoneNumber', {
            code,
            env: env as WechatMpEnv,
        });
    }

    async wakeupParasite(id: string) {
        const env = await this.environment.getEnv();
        const { result } = await this.cache.exec('wakeupParasite', {
            id,
            env: env as WechatMpEnv,
        });
        this.tokenValue = result;
        await this.storage.save(LOCAL_STORAGE_KEYS.token, result);
        this.publish();
    }
}
