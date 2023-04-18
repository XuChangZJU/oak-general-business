import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../general-app-domain';
import { AspectDict } from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { LocalStorage } from 'oak-frontend-base/lib/features/localStorage';
export declare class WeiXinJsSdk<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private storage;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage);
    wxConfig(): void;
    initWeiXinJsSDK(): Promise<void>;
    loadWeiXinJsSDK(): Promise<void>;
}
