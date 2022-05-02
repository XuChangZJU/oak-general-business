
import { SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'oak-app-domain';
import { RowStore } from 'oak-domain/lib/types';


export abstract class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> {
    applicationId: string;
    getTokenFn: () => Promise<string | undefined>;
    constructor(store: RowStore<ED, GeneralRuntimeContext<ED>>, appId: string, getToken: () => Promise<string | undefined>) {
        super(store);
        this.applicationId = appId;
        this.getTokenFn = getToken;
    }

    async getApplication () {
        const { result: [application] } = await this.rowStore.select('application', {
            data: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,                
            },
            filter: {
                id: this.applicationId,
            }
        }, this) as SelectionResult<EntityDict['application']['Schema'], {id: 1, name: 1, config: 1, type: 1, systemId: 1}>;
        
        return application;
    }
    
    async getToken() {
        const tokenValue = await this.getTokenFn();
        if (tokenValue) {
            const { result: [token] } = await this.rowStore.select('token', {
                data: {
                    id: 1,
                    userId: 1,
                    playerId: 1,
                },
                filter: {
                    id: tokenValue,
                    ableState: 'enabled',
                }
            }, this) as SelectionResult<ED['token']['Schema'], {id: 1, userId: 1, playerId: 1}>;

            return token;
        }
    }
};