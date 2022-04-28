import { EntityDict } from 'oak-app-domain';
import { Action, Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';

export class Token<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {

    private token?: string;

    @Action
    async loginByPassword(mobile: string, password: string) {
        this.token = await this.getAspectProxy().loginByPassword({ password, mobile });
    }

    @Action
    async loginWechatMp(code: string) {
        this.token = await this.getAspectProxy().loginWechatMp(code);
    }

    @Action
    async logout() {
        this.token = undefined;
    }

    getToken() {
        return this.token;
    }
}