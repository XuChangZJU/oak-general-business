import { EntityDict } from 'general-app-domain';
import { AppType } from 'general-app-domain/Application/Schema';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '../RuntimeContext';
declare const projection: {
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
};
export declare class Application<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private applicationId?;
    private application?;
    private rwLock;
    private cache;
    private storage;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD>, type: AppType, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>, callback: (application: SelectRowShape<ED['application']['Schema'], typeof projection>) => void);
    private getApplicationFromCache;
    private refresh;
    getApplication(): Promise<SelectRowShape<ED["application"]["Schema"], {
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
    getApplicationId(): string;
}
export {};
