import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../oak-app-domain';

import { RuntimeContext } from './RuntimeContext';
import { Application } from '../features/application';
import { Token } from '../features/token';
import GeneralAspectDict from '../aspects/AspectDict';
import { CommonAspectDict } from 'oak-common-aspect';
import { SyncContext, SyncRowStore } from 'oak-domain/lib/store/SyncRowStore';
import { AsyncContext } from 'oak-domain/lib/store/AsyncRowStore';
import { BackendRuntimeContext } from './BackendRuntimeContext';
import {
    OakTokenExpiredException,
    OakUserDisabledException,
} from '../types/Exception';
import { OakUnloggedInException } from 'oak-domain/lib/types';

type AspectDict<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>
> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
// 上下文被serialize后的数据内容
export type SerializedData = {
    a?: string;
    t?: string;
};

export class FrontendRuntimeContext<
        ED extends EntityDict & BaseEntityDict,
        Cxt extends BackendRuntimeContext<ED>,
        AD extends AspectDict<ED, Cxt>
    >
    extends SyncContext<ED>
    implements RuntimeContext
{
    private application?: Application<ED, Cxt, any, AD>;
    private token?: Token<ED, Cxt, any, AD>;
    constructor(
        store: SyncRowStore<ED, FrontendRuntimeContext<ED, Cxt, AD>>,
        application?: Application<
            ED,
            Cxt,
            FrontendRuntimeContext<ED, Cxt, AD>,
            AD
        >,
        token?: Token<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>
    ) {
        super(store);
        this.application = application;
        this.token = token;
    }

    getApplicationId() {
        return this.application?.getApplicationId();
    }

    getSystemId() {
        const app = this.application?.getApplication();
        return app?.systemId;
    }

    getApplication() {
        return this.application?.getApplication();
    }

    getTokenValue() {
        return this.token?.getTokenValue();
    }

    getToken(allowUnloggedIn?: boolean) {
        return this.token?.getToken(allowUnloggedIn);
    }

    getCurrentUserId(allowUnloggedIn?: boolean): string | undefined {
        return this.token?.getUserId(allowUnloggedIn);
    }

    toString(): string {
        const data = {};
        const a = this.application?.getApplicationId();
        const t = this.token?.getTokenValue();
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

    isRoot() {
        return this.token?.isRoot() || false;
    }

    isReallyRoot(): boolean {
        return this.token?.isReallyRoot() || false;
    }

    allowUserUpdate(): boolean {
        const userInfo = this.token?.getUserInfo();
        if (userInfo) {
            const { userState } = userInfo;
            if (userState === 'disabled') {
                throw new OakUserDisabledException(
                    '您的帐号已经被禁用，请联系客服'
                );
            } else if (['merged'].includes(userState!)) {
                throw new OakTokenExpiredException(
                    '您的登录状态有异常，请重新登录 '
                );
            } else {
                assert(userState === 'normal' || userState === 'shadow');
            }
            return true;
        }
        throw new OakUnloggedInException('您尚未登录');
    }
}
