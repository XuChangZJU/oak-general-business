import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';


export class WeiXinJsSdk<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private storage: LocalStorage;

    constructor(cache: Cache<ED, Cxt, FrontCxt, AD>, storage: LocalStorage) {
        super();
        this.cache = cache;
        this.storage = storage;
    }

    wxConfig() {
        console.warn('小程序无需该操作');
    }

    async initWeiXinJsSDK() {
        console.warn('小程序无需该操作');
    }

    async loadWeiXinJsSDK() {
        console.warn('小程序无需该操作');
    }
}
