
import { SelectRowShape, SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from '../general-app-domain';

export type GetApplicationShape = {
    id: 1,
    name: 1,
    config: 1,
    type: 1,
    systemId: 1,
    system: {
        id: 1,
        name: 1,
        config: 1,
        platformId: 1,
        platform: {
            id: 1,
            config: 1,
        }
    },
};

export type GetTokeShape = {
    id: 1,
    userId: 1,
    playerId: 1,
};

export interface RuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    getApplicationId(): Promise<string | undefined>;

    getSystemId(): Promise<string | undefined>;

    getApplication(): Promise<SelectRowShape<EntityDict['application']['Schema'], GetApplicationShape> | undefined>;

    getToken(allowUnloggedIn?: boolean): Promise<SelectRowShape<EntityDict['token']['Schema'], GetTokeShape> | undefined>; 

    getTokenValue(allowUnloggedIn?: boolean): Promise<string | undefined>;
    
    isRoot(allowUnloggedIn?: boolean): Promise<boolean>;
};