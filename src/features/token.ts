import { pick } from 'lodash';
import { EntityDict } from 'general-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { WechatMpEnv } from 'general-app-domain/Token/Schema';
import { Cache } from 'oak-frontend-base';

export class Token<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private token?: string;
    private rwLock: RWLock;
    private cache?: Cache<ED, Cxt, AD>;

    constructor() {
        super();
        this.rwLock = new RWLock();
    }

    @Action
    async loginByPassword(mobile: string, password: string, scene: string) {
        await this.rwLock.acquire('X');
        try {
            this.token = await this.getAspectProxy().loginByPassword({ password, mobile }, scene);
            this.rwLock.release();
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
            this.token = await this.getAspectProxy().loginWechatMp({
                code,
                env: Object.assign(env2, { type: 'wechatMp' }) as WechatMpEnv,
            }, scene);
            this.rwLock.release();
        }
        catch(err) {
            this.rwLock.release();
            throw err;
        }
    }

    @Action
    async syncUserInfoWechatMp(scene: string) {        
        const info = await wx.getUserProfile({
            desc: '同步微信昵称和头像信息',
        });

        const { userInfo: { nickName: nickname, avatarUrl }, encryptedData, signature, iv } = info;
        
        await this.getAspectProxy().syncUserInfoWechatMp({
            nickname,
            avatarUrl,
            encryptedData,
            signature,
            iv,
        }, scene);
    }

    @Action
    async logout() {
        this.token = undefined;
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

    setCache(cache: Cache<ED, Cxt, AD>) {
        this.cache = cache;
    }
    
    async getUserId() {     
        const token = await this.getToken();
        const result = await this.cache!.get('token', {
            data: {
                id: 1,
                userId: 1,                    
            },
            filter: {
                id: token!,
            }
        }, 'token:getUserId');
        return result[0]?.userId;
    }
}