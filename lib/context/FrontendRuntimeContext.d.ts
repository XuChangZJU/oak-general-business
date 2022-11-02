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
    private application?;
    private token?;
    constructor(store: RowStore<ED, Cxt>, application?: Application<ED, Cxt, AD>, token?: Token<ED, Cxt, AD>);
    getApplicationId(): Promise<string | undefined>;
    getSystemId(): Promise<("systemId" extends infer T ? T extends "systemId" ? T extends keyof ED["application"]["Schema"] ? {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
        system: {
            id: 1;
            name: 1;
            config: 1;
            platformId: 1;
            platform: {
                id: 1;
                config: 1;
            };
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
            platformId: 1;
            platform: {
                id: 1;
                config: 1;
            };
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
            platformId: 1;
            platform: {
                id: 1;
                config: 1;
            };
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
            platformId: 1;
            platform: {
                id: 1;
                config: 1;
            };
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
            platformId: 1;
            platform: {
                id: 1;
                config: 1;
            };
        };
    }[T]> : never : never : never) | undefined>;
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
            platformId: 1;
            platform: {
                id: 1;
                config: 1;
            };
        };
    }> | undefined>;
    getTokenValue(): Promise<string | undefined>;
    getToken(allowUnloggedIn?: boolean): Promise<import("oak-domain/lib/types").SelectRowShape<ED["token"]["Schema"], {
        id: 1;
        userId: 1;
        user: {
            id: 1;
            nickname: 1;
            name: 1;
            userState: 1;
            extraFile$entity: {
                $entity: "extraFile";
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
                    tag1: "avatar";
                };
                indexFrom: 0;
                count: 1;
            };
            mobile$user: {
                $entity: "mobile";
                data: {
                    id: 1;
                    mobile: 1;
                    userId: 1;
                };
            };
        };
        ableState: 1;
        player: {
            id: 1;
            userRole$user: {
                $entity: "userRole";
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
    }> | undefined>;
    getCurrentUserId(allowUnloggedIn?: boolean): Promise<string | undefined>;
    toString(): Promise<string>;
    isRoot(): Promise<boolean>;
}
export {};
