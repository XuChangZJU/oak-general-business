import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../general-app-domain';
import { AspectDict } from '../aspects/AspectDict';
import { RuntimeContext } from '../context/RuntimeContext';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
declare type UserProjection = {
    id: 1;
    nickname: 1;
    name: 1;
    userState: 1;
    extraFile$entity: {
        $entity: 'extraFile';
        data: {
            id: 1;
            tag1: 1;
            origin: 1;
            bucket: 1;
            objectId: 1;
            filename: 1;
            extra1: 1;
            type: 1;
            entity: 1;
            extension: 1;
        };
        filter: {
            tag1: 'avatar';
        };
        indexFrom: 0;
        count: 1;
    };
    mobile$user: {
        $entity: 'mobile';
        data: {
            id: 1;
            mobile: 1;
            userId: 1;
        };
    };
};
declare type TokenProjection = {
    id: 1;
    userId: 1;
    user: UserProjection;
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
export declare class Token<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature {
    private tokenValue?;
    private token?;
    private rwLock;
    private cache;
    private storage;
    private aspectWrapper;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage);
    loadTokenInfo(): Promise<void>;
    loginByMobile(mobile: string, password?: string, captcha?: string): Promise<void>;
    loginWechat(code: string): Promise<void>;
    loginWechatMp(): Promise<void>;
    syncUserInfoWechatMp(): Promise<void>;
    logout(): Promise<void>;
    getTokenValue(noWait?: true): Promise<string | undefined>;
    getToken(allowUnloggedIn?: boolean): Promise<SelectRowShape<ED["token"]["Schema"], TokenProjection> | undefined>;
    getUserId(allowUnloggedIn?: boolean): Promise<string | undefined>;
    getUserInfo(): Promise<("user" extends infer T ? T extends "user" ? T extends keyof ED["token"]["Schema"] ? TokenProjection[T] extends 1 | undefined ? ED["token"]["Schema"][T] : TokenProjection[T] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | SelectRowShape<Required<ED["token"]["Schema"]>[T][0], TokenProjection[T]["data"]>[] : T extends import("oak-domain/lib/types").OptionalKeys<ED["token"]["Schema"]> ? SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[T]>, TokenProjection[T]> | null : SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[T]>, TokenProjection[T]> : never : never : never) | SelectRowShape<ED["user"]["Schema"], ED["user"]["Selection"]["data"]> | undefined>;
    isRoot(): Promise<boolean>;
    sendCaptcha(mobile: string): Promise<string>;
}
export {};
