import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { FrontendRuntimeContext as Frc, SerializedData as Fsd } from 'oak-frontend-base';
import { BasicFeatures } from 'oak-frontend-base'
import { EntityDict } from '../oak-app-domain';

import { RuntimeContext } from './RuntimeContext';
import { Application } from '../features/application';
import { Token } from '../features/token';
import GeneralAspectDict from '../aspects/AspectDict';
import { CommonAspectDict } from 'oak-common-aspect';
import { SyncRowStore } from 'oak-domain/lib/store/SyncRowStore';
import { GeneralFeatures } from '../features';
import { BackendRuntimeContext } from './BackendRuntimeContext';
import {
    OakApplicationLoadingException,
    OakTokenExpiredException,
    OakUserDisabledException,
    OakUserInfoLoadingException,
} from '../types/Exception';
import { OakUnloggedInException } from 'oak-domain/lib/types';

export type AspectDict<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>
    > = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
// 上下文被serialize后的数据内容
export interface SerializedData extends Fsd {
    a?: string;
    t?: string;
    rm?: boolean;
};

export abstract class FrontendRuntimeContext<
    ED extends EntityDict & BaseEntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    AD extends AspectDict<ED, Cxt>
    >
    extends Frc<ED, Cxt, AD>
    implements RuntimeContext {
    private application: Application<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>;
    private token: Token<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>;
    constructor(
        store: SyncRowStore<ED, FrontendRuntimeContext<ED, Cxt, AD>>,
        features: GeneralFeatures<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD> & BasicFeatures<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>,
    ) {
        super(store, features);
        this.application = features.application;
        this.token = features.token;
    }

    protected async getSerializedData(): Promise<SerializedData> {
        const data = await super.getSerializedData();

        const setAppId = async () => {
            // appId必须要取到，不能失败
            const setInner = (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
                try {
                    const appId = this.application.getApplicationId();
                    assert(appId);
                    Object.assign(data, {
                        a: appId,
                    });
                    resolve(undefined);
                }
                catch (err: any) {
                    if (err instanceof OakApplicationLoadingException) {
                        const fn = this.application.subscribe(() => {
                            fn();
                            setInner(resolve, reject);
                        });
                    }
                    else {
                        reject(err);
                    }
                }
            };
            return new Promise(
                (resolve, reject) => setInner(resolve, reject)
            );
        };
        await setAppId();

        const setTokenValue = async() => {
            const setInner = (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
                try {
                    const tokenValue = this.token.getTokenValue();
                    if (tokenValue) {
                        Object.assign(data, {
                            t: tokenValue,
                        });
                    }
                    resolve(undefined);
                }
                catch (err: any) {
                    if (err instanceof OakUserInfoLoadingException) {
                        const fn = this.token.subscribe(() => {
                            fn();
                            setInner(resolve, reject);
                        });
                    }
                    else {
                        reject(err);
                    }
                }
            };
            return new Promise(
                (resolve, reject) => setInner(resolve, reject)
            );
        };
        await setTokenValue();
        return data;
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

    isRoot() {
        return this.token?.isRoot() || false;
    }

    isReallyRoot(): boolean {
        return this.token?.isReallyRoot() || false;
    }

    allowUserUpdate(): boolean {
        const userInfo = this.token?.getUserInfo();
        if (userInfo) {
            const { userState } = userInfo!;
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
