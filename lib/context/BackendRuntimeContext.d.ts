import { SelectRowShape } from 'oak-domain/lib/types';
import { GetApplicationShape, GetTokeShape, RuntimeContext } from './RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { SerializedData } from './FrontendRuntimeContext';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
export declare type GetTokeShape2 = {
    id: 1;
    userId: 1;
    playerId: 1;
    ableState: 1;
    player: {
        id: 1;
        userState: 1;
        userRole$user: {
            $entity: 'userRole';
            data: {
                id: 1;
                userId: 1;
                roleId: 1;
            };
        };
    };
};
/**
 * general数据结构要求的后台上下文
 */
export declare class BackendRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> implements RuntimeContext<ED> {
    private application?;
    private token?;
    private amIRoot?;
    private rootMode?;
    protected initialize(data?: SerializedData): Promise<void>;
    getApplicationId(): Promise<("id" extends infer T ? T extends "id" ? T extends keyof ED["application"]["Schema"] ? GetApplicationShape[T] extends 1 | undefined ? ED["application"]["Schema"][T] : GetApplicationShape[T] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | SelectRowShape<Required<ED["application"]["Schema"]>[T][0], GetApplicationShape[T]["data"]>[] : T extends import("oak-domain/lib/types").OptionalKeys<ED["application"]["Schema"]> ? SelectRowShape<NonNullable<Required<ED["application"]["Schema"]>[T]>, GetApplicationShape[T]> | null : SelectRowShape<NonNullable<Required<ED["application"]["Schema"]>[T]>, GetApplicationShape[T]> : never : never : never) | undefined>;
    getSystemId(): Promise<("systemId" extends infer T ? T extends "systemId" ? T extends keyof ED["application"]["Schema"] ? GetApplicationShape[T] extends 1 | undefined ? ED["application"]["Schema"][T] : GetApplicationShape[T] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | SelectRowShape<Required<ED["application"]["Schema"]>[T][0], GetApplicationShape[T]["data"]>[] : T extends import("oak-domain/lib/types").OptionalKeys<ED["application"]["Schema"]> ? SelectRowShape<NonNullable<Required<ED["application"]["Schema"]>[T]>, GetApplicationShape[T]> | null : SelectRowShape<NonNullable<Required<ED["application"]["Schema"]>[T]>, GetApplicationShape[T]> : never : never : never) | undefined>;
    getApplication(): Promise<SelectRowShape<ED["application"]["Schema"], GetApplicationShape> | undefined>;
    getTokenValue(allowUnloggedIn?: boolean): Promise<"oak-root-token" | ("id" extends infer T ? T extends "id" ? T extends keyof ED["token"]["Schema"] ? GetTokeShape[T] extends 1 | undefined ? ED["token"]["Schema"][T] : GetTokeShape[T] extends import("oak-domain/lib/types").OtmSubProjection ? never[] | SelectRowShape<Required<ED["token"]["Schema"]>[T][0], GetTokeShape[T]["data"]>[] : T extends import("oak-domain/lib/types").OptionalKeys<ED["token"]["Schema"]> ? SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[T]>, GetTokeShape[T]> | null : SelectRowShape<NonNullable<Required<ED["token"]["Schema"]>[T]>, GetTokeShape[T]> : never : never : never) | undefined>;
    getToken(allowUnloggedIn?: boolean): Promise<SelectRowShape<ED["token"]["Schema"], GetTokeShape> | undefined>;
    getCurrentUserId(allowUnloggedIn?: boolean): Promise<string>;
    toString(): Promise<string>;
    isRoot(allowUnloggedIn?: boolean): Promise<boolean>;
}
