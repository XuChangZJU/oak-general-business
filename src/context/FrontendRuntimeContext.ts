
import { RowStore } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';

import { RuntimeContext } from './RuntimeContext';
import { Application } from '../features/application';
import { Token } from '../features/token';
import { AspectDict as GeneralAspectDict } from '../aspects/AspectDict';
import { CommonAspectDict } from 'oak-common-aspect';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';

type AspectDict<ED extends EntityDict, Cxt extends RuntimeContext<ED>> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
// 上下文被serialize后的数据内容
export type SerializedData = {
    a?: string;
    t?: string;
}

export class FrontendRuntimeContext<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>>  extends UniversalContext<ED> implements RuntimeContext<ED> {
    private application?: Application<ED, Cxt, AD>;
    private token?: Token<ED, Cxt, AD>;
    constructor(store: RowStore<ED, Cxt>, application?: Application<ED, Cxt, AD>, token?: Token<ED, Cxt, AD>) {
        super(store);
        this.application = application;
        this.token = token;
    }

    async getApplicationId() {
        return this.application?.getApplicationId();
    }

    async getSystemId() {
        const app = await this.application?.getApplication();
        return app?.systemId;
    }

    async getApplication() {
        return this.application?.getApplication();
    }

    async getTokenValue() {
        return this.token?.getTokenValue();
    }

    async getToken() {
        return this.token?.getToken();
    }

    async getCurrentUserId(): Promise<string | undefined> {
        return this.token?.getUserId();
    }

    async toString(): Promise<string> {
        const data = {
        };
        const a = await this.application?.getApplicationId(true);
        const t = await this.token?.getTokenValue(true);
        if (t) {
            Object.assign(data, {
                t,
            });
        }
        if (a) {
            Object.assign(data, {
                a,
            });
        }
        return JSON.stringify(data);
    }

    async isRoot() {
        return this.token?.isRoot() || false;
    }
};