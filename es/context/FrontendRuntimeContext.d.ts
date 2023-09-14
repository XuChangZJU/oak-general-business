import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { EntityDict } from '../oak-app-domain';
import { RuntimeContext } from './RuntimeContext';
import { Application } from '../features/application';
import { Token } from '../features/token';
import GeneralAspectDict from '../aspects/AspectDict';
import { CommonAspectDict } from 'oak-common-aspect';
import { SyncContext, SyncRowStore } from 'oak-domain/lib/store/SyncRowStore';
import { BackendRuntimeContext } from './BackendRuntimeContext';
type AspectDict<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
export type SerializedData = {
    a?: string;
    t?: string;
};
export declare class FrontendRuntimeContext<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends SyncContext<ED> implements RuntimeContext {
    private application?;
    private token?;
    constructor(store: SyncRowStore<ED, FrontendRuntimeContext<ED, Cxt, AD>>, application?: Application<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>, token?: Token<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>);
    getApplicationId(): string | undefined;
    getSystemId(): string | undefined;
    getApplication(): Partial<import("../oak-app-domain/Application/Schema").Schema> | undefined;
    getTokenValue(): string | undefined;
    getToken(allowUnloggedIn?: boolean): Partial<ED["token"]["Schema"]> | undefined;
    getCurrentUserId(allowUnloggedIn?: boolean): string | undefined;
    toString(): string;
    isRoot(): boolean;
    isReallyRoot(): boolean;
    allowUserUpdate(): boolean;
}
export {};
