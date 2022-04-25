import { EntityDict } from 'oak-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
import { aspectDict } from '../aspects';
import { Action, Feature } from 'oak-frontend-base';

export class Token extends Feature<EntityDict, GeneralRuntimeContext<EntityDict>, typeof aspectDict> {

    private token?: string;

    @Action
    async loginByPassword(mobile: string, password: string) {
        this.token = await this.getAspectProxy().loginByPassword({ password, mobile });
    }

    @Action
    async logout() {
        this.token = undefined;
    }

    getToken() {
        return this.token;
    }
}