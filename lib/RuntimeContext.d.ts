import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'general-app-domain';
import { RowStore } from 'oak-domain/lib/types';
export declare abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    private applicationId?;
    private token?;
    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, appId?: string);
    getApplicationId(): string | undefined;
    setApplicationId(appId: string): void;
    setToken(token?: string): void;
    getApplication(): Promise<import("oak-domain/lib/types").SelectRowShape<import("general-app-domain/Application/Schema").Schema, {
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
    getToken(): Promise<import("oak-domain/lib/types").SelectRowShape<ED["token"]["Schema"], {
        id: 1;
        userId: 1;
        playerId: 1;
    }> | undefined>;
    getTokenValue(): string | undefined;
    toString(): Promise<string>;
    protected static destructString(strCxt: string): {
        applicationId: any;
        scene: any;
        token: any;
    };
}
