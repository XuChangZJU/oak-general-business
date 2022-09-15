import { Action, Feature } from 'oak-frontend-base/lib/types/Feature';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { CommonAspectDict } from 'oak-common-aspect';
import { WebEnv, WechatMpEnv } from '../general-app-domain/Token/Schema';
import { EntityDict } from '../general-app-domain';
import { getEnv } from '../utils/env';
import { AspectDict } from '../aspects/AspectDict';
import { RuntimeContext } from '../context/RuntimeContext';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
import { ROOT_ROLE_ID } from '../constants';

type TokenProjection = {
    id: 1,
    userId: 1,
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
const tokenProjection: TokenProjection = {
    id: 1,
    userId: 1,
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
    Cxt extends RuntimeContext<ED>,
    AD extends AspectDict<ED, Cxt>
    > extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private tokenValue?: string;
    private token?: SelectRowShape<ED['token']['Schema'], TokenProjection>;
    private rwLock: RWLock;
    private cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;

    constructor(
        aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
        cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>,
        storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>
    ) {
        super(aspectWrapper);
        this.rwLock = new RWLock();
        this.cache = cache;
        this.storage = storage;
        const tokenValue = storage.load('token:token');
        if (tokenValue) {
            this.tokenValue = tokenValue;
        }
    }

    async loadTokenInfo() {
        await this.rwLock.acquire('X');
        if (!this.token) {
            const { data } = await this.cache.refresh('token', {
                data: {
                    id: 1,
                    userId: 1,
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
                },
                filter: {
                    id: this.tokenValue!,
                },
            });
            this.token = data as any;
        }
        this.rwLock.release();
    }

    @Action
    async loginByMobile(mobile: string, password?: string, captcha?: string) {
        const env = await getEnv();
        await this.rwLock.acquire('X');
        try {
            const { result } = await this.getAspectWrapper().exec(
                'loginByMobile',
                { password, mobile, captcha, env }
            );
            this.tokenValue = result;
            this.rwLock.release();
            this.storage.save('token:token', result);
        } catch (err) {
            this.rwLock.release();
            throw err;
        }
    }

    @Action
    async loginWechat(code: string) {
        await this.rwLock.acquire('X');
        try {
            const env = await getEnv();
            const { result } = await this.getAspectWrapper().exec(
                'loginWechat',
                {
                    code,
                    env: env as WebEnv,
                }
            );
            this.tokenValue = result;
            this.rwLock.release();
            this.storage.save('token:token', result);
        } catch (err) {
            this.rwLock.release();
            throw err;
        }
    }

    @Action
    async loginWechatMp() {
        await this.rwLock.acquire('X');
        try {
            const { code } = await wx.login();

            const env = await getEnv();
            const { result } = await this.getAspectWrapper().exec(
                'loginWechatMp',
                {
                    code,
                    env: env as WechatMpEnv,
                }
            );
            this.tokenValue = result;
            this.rwLock.release();
            this.storage.save('token:token', result);
        } catch (err) {
            this.rwLock.release();
            throw err;
        }
    }

    @Action
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

        await this.getAspectWrapper().exec('syncUserInfoWechatMp', {
            nickname,
            avatarUrl,
            encryptedData,
            signature,
            iv,
        });
    }

    @Action
    async logout() {
        this.tokenValue = undefined;
        this.storage.remove('token:token');
    }

    async getTokenValue(noWait?: true) {
        if (noWait) {
            return this.tokenValue;
        }
        await this.rwLock.acquire('S');
        const token = this.tokenValue;
        this.rwLock.release();
        return token;
    }

    async getToken() {
        if (this.token) {
            return this.token;
        }
        await this.loadTokenInfo();
        return this.token!;
    }

    async getUserId() {
        const token = await this.getToken();
        return token?.userId as string | undefined;
    }

    async isRoot(): Promise<boolean> {
        const token = await this.getToken();

        const { player } = token;
        const { userRole$user} = player!;
        return (userRole$user as any).length > 0 && (userRole$user as any).find(
            (ele: any) => ele.role.name === 'root'
        );
    }

    @Action
    async sendCaptcha(mobile: string) {
        const env = await getEnv();
        const { result } = await this.getAspectWrapper().exec('sendCaptcha', {
            mobile,
            env: env as WebEnv,
        });
        return result as string;
    }
}