import { SelectRowShape } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from './general-app-domain';
import { RowStore } from 'oak-domain/lib/types';
declare type AppType = SelectRowShape<EntityDict['application']['Schema'], {
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
}>;
export declare abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    private applicationId?;
    private application?;
    private token?;
    private rwLockApplication;
    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, applicationId?: string);
    getApplicationId(): string | undefined;
    getSystemId(): Promise<string | undefined>;
    setToken(token?: string): void;
    getApplication(): Promise<SelectRowShape<import("./general-app-domain/Application/Schema").Schema, {
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
    }> | undefined>;
    setApplication(app: AppType): void;
    getToken(): Promise<SelectRowShape<ED["token"]["Schema"], {
        id: 1;
        userId: 1;
        playerId: 1;
    }> | undefined>;
    getTokenValue(): string | undefined;
    getCurrentUserId(): Promise<string | undefined>;
    toString(): Promise<string>;
    protected static fromString(strCxt: string): {
        applicationId: any;
        scene: any;
        token: any;
    };
    isRoot(): Promise<boolean>;
}
export {};
