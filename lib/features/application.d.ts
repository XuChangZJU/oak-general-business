import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../general-app-domain';
import { AppType } from '../general-app-domain/Application/Schema';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
export declare class Application<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private type;
    private domain;
    private applicationId?;
    private application?;
    private cache;
    private storage;
    constructor(type: AppType, domain: string, cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage);
    private loadApplicationInfo;
    private getApplicationFromCache;
    private refresh;
    initialize(): Promise<void>;
    getApplication(): Partial<import("../general-app-domain/Application/Schema").Schema>;
    getApplicationId(): string | undefined;
}
