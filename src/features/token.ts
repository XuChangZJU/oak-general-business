import { pick } from 'lodash';
import { EntityDict } from 'oak-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
import { RWLock } from 'oak-domain/lib/utils/concurrent';
import { WechatMpEnv } from 'oak-app-domain/Token/Schema';

export class Token<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private token?: string;
    private rwLock: RWLock;

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
}