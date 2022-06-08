import { EntityDict } from 'general-app-domain';
import { Feature } from 'oak-frontend-base';
import { Aspect, Context, SelectRowShape } from 'oak-domain/lib/types';
import { Cache } from 'oak-frontend-base';
export declare class Application<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private applicationId?;
    private application?;
    private rwLock;
    private cache?;
    constructor();
    setApplicationId(id: string): Promise<void>;
    setCache(cache: Cache<ED, Cxt, AD>): void;
    getApplication(): SelectRowShape<ED["application"]["Schema"], {
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
    getApplicationId(): string;
}
