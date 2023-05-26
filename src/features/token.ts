import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { OakRowInconsistencyException, OakUnloggedInException, OakUserUnpermittedException } from 'oak-domain/lib/types/Exception';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { CommonAspectDict } from 'oak-common-aspect';
import { WebEnv, WechatMpEnv } from '../general-app-domain/Token/Schema';
import { EntityDict } from '../general-app-domain';
import { getEnv } from '../utils/env';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { ROOT_ROLE_ID } from '../constants';
import { tokenProjection } from '../types/projection';

export class Token<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private tokenValue?: string;
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage;

    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage) {
        super();
        this.cache = cache;
        this.storage = storage;
        const tokenValue = storage.load('token:token');
        if (tokenValue) {
            this.tokenValue = tokenValue;
            // this.loadTokenInfo();
        }
    }

    async loadTokenInfo() {
        await this.cache.refresh('token', {
            data: tokenProjection,
            filter: {
                id: this.tokenValue!,
            },
        });
        this.publish();
    }

    async loginByMobile(mobile: string, password?: string, captcha?: string) {
        const env = await getEnv();
        const { result } = await this.cache.exec('loginByMobile', {
            password,
            mobile,
            captcha,
            env,
        });
        this.tokenValue = result;
        this.storage.save('token:token', result);
        this.publish();
    }

    async loginWechat(code: string) {
        const env = await getEnv();
        const { result } = await this.cache.exec('loginWechat', {
            code,
            env: env as WebEnv,
        });
        this.tokenValue = result;
        this.storage.save('token:token', result);
        this.publish();
    }

    async loginWechatMp() {
        const { code } = await wx.login();

        const env = await getEnv();
        const { result } = await this.cache.exec('loginWechatMp', {
            code,
            env: env as WechatMpEnv,
        });
        this.tokenValue = result;
        this.storage.save('token:token', result);
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
        // await this.cache.exec('logout', {});
        this.tokenValue = undefined;
        this.storage.remove('token:token');
        this.publish();
    }

    getTokenValue() {
        return this.tokenValue;
    }

    getToken(allowUnloggedIn?: boolean, context?: FrontCxt) {
        if (this.tokenValue) {
            const token = this.cache.get(
                'token',
                {
                    data: tokenProjection,
                    filter: {
                        id: this.tokenValue!,
                    },
                },
                context
            )[0];
            if (!token) {
                this.loadTokenInfo(); 
            }
            return token;
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new OakUnloggedInException();
    }

    getUserId(allowUnloggedIn?: boolean, context?: FrontCxt) {
        const token = this.getToken(allowUnloggedIn, context);
        if (token?.userId) {
            return token.userId!;
        }
    }

    // getUserInfo 不要求登录
    getUserInfo(context?: FrontCxt) {
        const token = this.getToken(true, context);
        if (token?.user) {
            return token.user;
        }
    }

    isRoot(context?: FrontCxt): boolean {
        const token = this.getToken(true, context);
        return !!token?.user?.isRoot;
    }

    /**
     * 这个是指token的player到底是不是root
     * @returns
     */
    isReallyRoot(context?: FrontCxt): boolean {
        const token = this.getToken(true, context);
        return !!token?.player?.isRoot;
    }

    async sendCaptcha(mobile: string) {
        const env = await getEnv();
        const { result } = await this.cache.exec('sendCaptcha', {
            mobile,
            env: env as WebEnv,
        });
        return result as string;
    }

    async switchTo(userId: string) {
        if (!this.isReallyRoot()) {
            throw new OakUserUnpermittedException();
        }
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
        this.publish();
    }

    async getWechatMpUserPhoneNumber(code: string) {
        const env = await getEnv();
        await this.cache.exec('getWechatMpUserPhoneNumber', {
            code,
            env: env as WechatMpEnv,
        });
        this.publish();
    }
}