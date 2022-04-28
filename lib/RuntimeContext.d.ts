import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'oak-app-domain';
import { RowStore } from 'oak-domain/lib/types';
export declare abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    applicationId: string;
    token?: string;
    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, appId: string, token?: string);
    getApplication(): Promise<import("oak-domain/lib/types").SelectRowShape<import("oak-app-domain/Application/Schema").Schema, {
        id: 1;
        name: 1;
        config: 1;
        type: 1;
        systemId: 1;
    }>>;
    getToken(): Promise<import("oak-domain/lib/types").SelectRowShape<ED["token"]["Schema"], {
        id: 1;
        userId: 1;
        playerId: 1;
    }> | undefined>;
}
