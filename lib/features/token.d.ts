import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../general-app-domain';
import { AspectDict } from '../aspects/AspectDict';
import { RuntimeContext } from '../context/RuntimeContext';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
declare type TokenProjection = {
    id: 1;
    userId: 1;
    ableState: 1;
    player: {
        id: 1;
        userRole$user: {
            $entity: 'userRole';
            data: {
                id: 1;
                userId: 1;
                roleId: 1;
                role: {
                    id: 1;
                    name: 1;
                };
            };
        };
    };
    playerId: 1;
};
export declare class Token<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private tokenValue?;
    private token?;
    private rwLock;
    private cache;
    private storage;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>);
    loadTokenInfo(): Promise<void>;
    loginByMobile(mobile: string, password?: string, captcha?: string): Promise<void>;
    loginWechat(code: string): Promise<void>;
    loginWechatMp(): Promise<void>;
    syncUserInfoWechatMp(): Promise<void>;
    logout(): Promise<void>;
    getTokenValue(noWait?: true): Promise<string | undefined>;
    getToken(): Promise<SelectRowShape<ED["token"]["Schema"], TokenProjection>>;
    getUserId(): Promise<string | undefined>;
    getUserInfo(): Promise<SelectRowShape<ED["user"]["Schema"], ED["user"]["Selection"]["data"]> | undefined>;
    isRoot(): Promise<boolean>;
    sendCaptcha(mobile: string): Promise<string>;
}
export {};
