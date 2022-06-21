import { pick } from 'lodash';
import { EntityDict } from 'general-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { WechatMpEnv } from 'general-app-domain/Token/Schema';
import { Cache } from 'oak-frontend-base';
import { AspectDict as CommonAspectDict } from 'oak-common-aspect/lib/aspectDict';
import { AspectDict } from '../aspects/aspectDict';
import { GeneralRuntimeContext } from '..';
import { AspectWrapper } from 'oak-domain/lib/types';

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
    async loginByPassword(mobile: string, password: string) {
        await this.rwLock.acquire('X');
        try {
            const { result } = await this.getAspectWrapper().exec('loginByPassword', { password, mobile });
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
    async loginWechatMp(scene: string) {   
        await this.rwLock.acquire('X');
        try {
            const { code } = await wx.login();
            const env = await wx.getSystemInfo();
            const env2 = pick(env, [
                'brand',
                'model',
                'pixelRatio',
                'screenWidth',
                'screenHeight',
                'windowWidth',
                'windowHeight',
                'statusBarHeight',
                'language',
                'version',
                'system',
                'platform',
                'fontSizeSetting',
                'SDKVersion'
            ]);
            const { result } = await this.getAspectWrapper().exec('loginWechatMp', {
                code,
                env: Object.assign(env2, { type: 'wechatMp' }) as WechatMpEnv,
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
        const result = await this.cache.get('token', {
            data: {
                id: 1,
                userId: 1,                    
            },
            filter: {
                id: token!,
            }
        });
        return result[0]?.userId;
    }
}