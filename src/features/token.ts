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
    async loginByPassword(mobile: string, password: string) {
        await this.rwLock.acquire('X');
        this.token = await this.getAspectProxy().loginByPassword({ password, mobile });
        this.rwLock.release();
    }

    @Action
    async loginWechatMp(code: string, env: WechatMpEnv) {
        await this.rwLock.acquire('X');
        this.token = await this.getAspectProxy().loginWechatMp({
            code,
            env,
        });
        this.rwLock.release();
    }

    @Action
    async logout() {
        this.token = undefined;
    }

    async getToken() {     
        await this.rwLock.acquire('S');
        const token = this.token;
        this.rwLock.release();
        return token;
    }
}