import { EntityDict } from 'general-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { WebEnv, WechatMpEnv } from 'general-app-domain/Token/Schema';
import { Cache } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { getEnv } from '../utils/env';
import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '..';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
import { ROOT_ROLE_ID } from '../constants';

export class Token<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private token?: string;
    private rwLock: RWLock;
    private cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>;
    private context: Cxt;

    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, context: Cxt) {
        super(aspectWrapper);
        this.rwLock = new RWLock();
        this.cache = cache;
        this.context = context;
    }

    @Action
    async loginByMobile(mobile: string, password?: string, captcha?: string) {
        const env = await getEnv();
        await this.rwLock.acquire('X');
        try {
            const { result } = await this.getAspectWrapper().exec('loginByMobile', { password, mobile, captcha, env });
            this.token = result;
            this.rwLock.release();
            this.context.setToken(result);
        }
        catch (err) {
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
            const { result } = await this.getAspectWrapper().exec('loginWechatMp', {
                code,
                env: env as WechatMpEnv,
            });
            this.token = result;
            this.context.setToken(result);
            this.rwLock.release();
        }
        catch(err) {
            this.rwLock.release();
            throw err;
        }
    }

    @Action
    async syncUserInfoWechatMp() {        
        const info = await wx.getUserProfile({
            desc: '同步微信昵称和头像信息',
        });

        const { userInfo: { nickName: nickname, avatarUrl }, encryptedData, signature, iv } = info;
        
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
        this.token = undefined;
        this.context.setToken(undefined);
    }

    async getToken() {     
        await this.rwLock.acquire('S');
        try {
            const token = this.token;
            this.rwLock.release();
            return token;
        }
        catch (err) {
            this.rwLock.release();
            throw err;
        }
    }
    
    async getUserId() {     
        const token = await this.getToken();
        if (!token) {
            return;
        }
        const result = await this.cache.get('token', {
            data: {
                id: 1,
                userId: 1,                    
            },
            filter: {
                id: token,
            }
        });
        return result[0]?.userId as string;
    }

    async isRoot(): Promise<boolean> {   
        const token = await this.getToken();
        if (!token) {
            return false;
        }
        const [tokenValue] = (await this.cache.get('token', {
            data: {
                id: 1,
                userId: 1, 
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
            },
            filter: {
                id: token,
            }
        })) as SelectRowShape<ED['token']['Schema'], {
            id: 1,
            userId: 1, 
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
        }>[];
        return (tokenValue?.player?.userRole$user as any).length > 0 ? (tokenValue?.player?.userRole$user as any)[0]?.roleId === ROOT_ROLE_ID : false;
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