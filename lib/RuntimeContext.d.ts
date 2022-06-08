import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'general-app-domain';
import { RowStore } from 'oak-domain/lib/types';
export declare abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    private applicationId;
    private getTokenFn;
    private scene;
    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, appId: string, getToken: () => Promise<string | undefined>, scene: string);
    getApplicationId(): string;
    getApplication(): Promise<import("oak-domain/lib/types").SelectRowShape<EntityDict, {
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
    getToken(): Promise<import("oak-domain/lib/types").SelectRowShape<ED["token"]["Schema"], {
        id: 1;
        userId: 1;
        playerId: 1;
    }> | undefined>;
    getTokenValue(): Promise<string | undefined>;
    getScene(): string;
}
