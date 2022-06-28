import { EntityDict } from 'general-app-domain';
import { Feature } from 'oak-frontend-base';
import { Cache } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '..';
import { AspectWrapper } from 'oak-domain/lib/types';
export declare class Token<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private token?;
    private rwLock;
    private cache;
    private context;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, context: Cxt);
    loginByPassword(mobile: string, password: string): Promise<void>;
    loginWechatMp(): Promise<void>;
    syncUserInfoWechatMp(): Promise<void>;
    logout(): Promise<void>;
    getToken(): Promise<string | undefined>;
    getUserId(): Promise<("userId" extends infer T ? T extends "userId" ? T extends keyof ED["token"]["Schema"] ? ED["token"]["Selection"]["data"][T] extends 1 | undefined ? ED["token"]["Schema"][T] : ED["token"]["Selection"]["data"][T] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | import("oak-domain/lib/types").SelectRowShape<Required<ED["token"]["Schema"]>[T][0], ED["token"]["Selection"]["data"][T]["data"]>[] : T extends import("oak-domain/lib/types").OptionalKeys<ED["token"]["Schema"]> ? import("oak-domain/lib/types").SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[T]>, ED["token"]["Selection"]["data"][T]> | null : import("oak-domain/lib/types").SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[T]>, ED["token"]["Selection"]["data"][T]> : never : never : never) | undefined>;
}
