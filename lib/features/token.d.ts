import { EntityDict } from 'general-app-domain';
import { Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
import { Cache } from 'oak-frontend-base';
export declare class Token<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private token?;
    private rwLock;
    private cache?;
    constructor();
    loginByPassword(mobile: string, password: string, scene: string): Promise<void>;
    loginWechatMp(scene: string): Promise<void>;
    syncUserInfoWechatMp(scene: string): Promise<void>;
    logout(): Promise<void>;
    getToken(): Promise<string | undefined>;
    setCache(cache: Cache<ED, Cxt, AD>): void;
    getUserId(): Promise<string extends keyof ED["token"]["Schema"] ? ED["token"]["Selection"]["data"][keyof ED["token"]["Schema"] & string] extends 1 | undefined ? ED["token"]["Schema"][keyof ED["token"]["Schema"] & string] : ED["token"]["Selection"]["data"][keyof ED["token"]["Schema"] & string] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | import("oak-domain/lib/types").SelectRowShape<Required<ED["token"]["Schema"]>[keyof ED["token"]["Schema"] & string][0], ED["token"]["Selection"]["data"][keyof ED["token"]["Schema"] & string]["data"]>[] : keyof ED["token"]["Schema"] & string extends import("oak-domain/lib/types").OptionalKeys<ED["token"]["Schema"]> ? import("oak-domain/lib/types").SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[import("oak-domain/lib/types").OptionalKeys<ED["token"]["Schema"]> & keyof ED["token"]["Schema"] & string]>, ED["token"]["Selection"]["data"][import("oak-domain/lib/types").OptionalKeys<ED["token"]["Schema"]> & keyof ED["token"]["Schema"] & string]> | null : import("oak-domain/lib/types").SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[keyof ED["token"]["Schema"] & string]>, ED["token"]["Selection"]["data"][keyof ED["token"]["Schema"] & string]> : never>;
}
