import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { FrontendRuntimeContext as Frc, SerializedData as Fsd } from 'oak-frontend-base';
import { BasicFeatures } from 'oak-frontend-base';
import { EntityDict } from '../oak-app-domain';
import { RuntimeContext } from './RuntimeContext';
import GeneralAspectDict from '../aspects/AspectDict';
import { CommonAspectDict } from 'oak-common-aspect';
import { SyncRowStore } from 'oak-domain/lib/store/SyncRowStore';
import { GeneralFeatures } from '../features';
import { BackendRuntimeContext } from './BackendRuntimeContext';
export type AspectDict<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>> = GeneralAspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>;
export interface SerializedData extends Fsd {
    a?: string;
    t?: string;
    userId?: string;
    rm?: boolean;
}
export declare abstract class FrontendRuntimeContext<ED extends EntityDict & BaseEntityDict, Cxt extends BackendRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Frc<ED, Cxt, AD> implements RuntimeContext {
    private application;
    private token;
    constructor(store: SyncRowStore<ED, FrontendRuntimeContext<ED, Cxt, AD>>, features: GeneralFeatures<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD> & BasicFeatures<ED, Cxt, FrontendRuntimeContext<ED, Cxt, AD>, AD>);
    protected getSerializedData(): Promise<SerializedData>;
    getApplicationId(): string;
    getSystemId(): string | undefined;
    getApplication(): Partial<import("../oak-app-domain/Application/Schema").Schema> | undefined;
    getTokenValue(): string | undefined;
    getToken(allowUnloggedIn?: boolean): Partial<ED["token"]["Schema"]> | undefined;
    getCurrentUserId(allowUnloggedIn?: boolean): string | undefined;
    isRoot(): boolean;
    isReallyRoot(): boolean;
    allowUserUpdate(): boolean;
}
