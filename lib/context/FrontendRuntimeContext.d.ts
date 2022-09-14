import { RowStore } from 'oak-domain/lib/types';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from './RuntimeContext';
import { Application } from '../features/application';
import { Token } from '../features/token';
import { AspectDict as GeneralAspectDict } from '../aspects/AspectDict';
import { CommonAspectDict } from 'oak-common-aspect';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
declare type AspectDict<ED extends EntityDict, Cxt extends RuntimeContext<ED>> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
export declare type SerializedData = {
    a?: string;
    t?: string;
};
export declare class FrontendRuntimeContext<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends UniversalContext<ED> implements RuntimeContext<ED> {
    private application;
    private token;
    constructor(store: RowStore<ED, Cxt>, application: Application<ED, Cxt, AD>, token: Token<ED, Cxt, AD>);
    getApplicationId(): Promise<string>;
    getSystemId(): Promise<"systemId" extends infer T ? T extends "systemId" ? T extends keyof ED["application"]["Schema"] ? {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
        };
    }[T] extends 1 | undefined ? ED["application"]["Schema"][T] : {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
        };
    }[T] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | import("oak-domain/lib/types").SelectRowShape<Required<ED["application"]["Schema"]>[T][0], {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
        };
    }[T]["data"]>[] : T extends import("oak-domain/lib/types").OptionalKeys<ED["application"]["Schema"]> ? import("oak-domain/lib/types").SelectRowShape<NonNullable<Required<ED["application"]["Schema"]>[T]>, {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
        };
    }[T]> | null : import("oak-domain/lib/types").SelectRowShape<NonNullable<Required<ED["application"]["Schema"]>[T]>, {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
        };
    }[T]> : never : never : never>;
    getApplication(): Promise<import("oak-domain/lib/types").SelectRowShape<ED["application"]["Schema"], {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
        };
    }>>;
    getTokenValue(): Promise<string | undefined>;
    getToken(): Promise<import("oak-domain/lib/types").SelectRowShape<import("../general-app-domain/Token/Schema").Schema, {
        id: 1;
        userId: 1;
        ableState: 1;
        playerId: 1;
    }> | undefined>;
    getCurrentUserId(): Promise<string | undefined>;
    toString(): Promise<string>;
    isRoot(): Promise<boolean>;
}
export {};
