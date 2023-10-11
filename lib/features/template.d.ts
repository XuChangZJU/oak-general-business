import { Feature } from 'oak-frontend-base';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { CommonAspectDict } from 'oak-common-aspect';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare class Template<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>);
    syncMessageTemplate(applicationId: string): Promise<void>;
}
