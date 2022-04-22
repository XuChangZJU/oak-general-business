
import { Context, SelectionResult } from 'oak-domain/lib/types';
import { UniversalContext } from 'oak-domain/lib/store/UniversalContext';
import { EntityDict } from 'oak-app-domain/EntityDict';
import { RowStore } from 'oak-domain/lib/types';


export class GeneralRuntimeContext<ED extends EntityDict> extends UniversalContext<ED> implements Context<ED> {
    applicationId: string;
    constructor(store: RowStore<ED>, appId: string) {
        super(store);
        this.applicationId = appId;
    }

    async getApplication () {
        const { result: [application] } = await this.rowStore.select('application', {
            data: {
                id: 1,
                name: 1,
            },
            filter: {
                id: this.applicationId,
            }
        }, this) as SelectionResult<ED['application']['Schema'], {id: 1, name: 1}>;
        
        return application;
    }
    
    getToken() {

    }
};