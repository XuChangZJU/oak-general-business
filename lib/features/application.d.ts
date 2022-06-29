import { EntityDict } from 'general-app-domain';
import { Feature } from 'oak-frontend-base';
import { AspectWrapper, SelectRowShape } from 'oak-domain/lib/types';
import { Cache } from 'oak-frontend-base';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { GeneralRuntimeContext } from '..';
export declare class Application<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    private applicationId;
    private application?;
    private rwLock;
    private cache;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD>, applicationId: string, cache: Cache<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>);
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
