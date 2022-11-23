import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { OakUnloggedInException } from 'oak-domain/lib/types/Exception';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { CommonAspectDict } from 'oak-common-aspect';
import { WebEnv, WechatMpEnv } from '../general-app-domain/Token/Schema';
import { EntityDict } from '../general-app-domain';
import { getEnv } from '../utils/env';
import { AspectDict } from '../aspects/AspectDict';
import { AspectWrapper } from 'oak-domain/lib/types';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { ROOT_ROLE_ID } from '../constants';

const userProjection: EntityDict['user']['Selection']['data'] = {
    id: 1,
    nickname: 1,
    name: 1,
    userState: 1,
    extraFile$entity: {
        $entity: 'extraFile',
        data: {
            id: 1,
            tag1: 1,
            origin: 1,
            bucket: 1,
            objectId: 1,
            filename: 1,
            extra1: 1,
            type: 1,
            entity: 1,
            extension: 1,
        },
        filter: {
            tag1: 'avatar',
        },
        indexFrom: 0,
        count: 1,
    },
    mobile$user: {
        $entity: 'mobile',
        data: {
            id: 1,
            mobile: 1,
            userId: 1,
        },
    },
};
const tokenProjection: EntityDict['token']['Selection']['data'] = {
    id: 1,
    userId: 1,
    user: userProjection,
    ableState: 1,
    player: {
        id: 1,
        userRole$user: {
            $entity: 'userRole',
            data: {
                id: 1,
                userId: 1,
                roleId: 1,
            },
        },
    },
    playerId: 1,
};

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
            this.loadTokenInfo();
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
        const result = await this.cache.exec('loginByMobile', {
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
        const result = await this.cache.exec('loginWechat', {
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
        const result = await this.cache.exec('loginWechatMp', {
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
        this.tokenValue = undefined;
        this.storage.remove('token:token');
        this.publish();
    }

    getTokenValue() {
        return this.tokenValue;
    }

    getToken(allowUnloggedIn?: boolean) {
        if (this.tokenValue) {
            return this.cache.get('token', {
                data: tokenProjection,
                filter: {
                    id: this.tokenValue!,
                },
            })[0];
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new OakUnloggedInException();
    }

    getUserId(allowUnloggedIn?: boolean) {
        if (this.tokenValue) {
            const [token] = this.cache.get('token', {
                data: {
                    id: 1,
                    userId: 1,
                },
                filter: {
                    id: this.tokenValue,
                },
            });
            return token.id!;
        }
        if (allowUnloggedIn) {
            return undefined;
        }
        throw new OakUnloggedInException();
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
        const userRole$user = token?.player?.userRole$user;
        return !!(
            userRole$user &&
            userRole$user?.length > 0 &&
            userRole$user.find((ele) => ele.roleId === ROOT_ROLE_ID)
        );
    }

    async sendCaptcha(mobile: string) {
        const env = await getEnv();
        const result = await this.cache.exec('sendCaptcha', {
            mobile,
            env: env as WebEnv,
        });
        return result as string;
    }
}