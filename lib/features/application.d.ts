import { LocalStorage } from 'oak-frontend-base/es/features/localStorage';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { Feature } from 'oak-frontend-base/es/types/Feature';
import { CommonAspectDict } from 'oak-common-aspect';
import { EntityDict } from '../oak-app-domain';
import { AppType } from '../oak-app-domain/Application/Schema';
import AspectDict from '../aspects/AspectDict';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { MediaType, MediaVideoDescription } from '../types/WeChat';
import { Token } from './token';
export declare class Application<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private type;
    private domain;
    private applicationId?;
    private application?;
    private cache;
    private storage;
    private projection;
    private token;
    constructor(type: AppType, domain: string, cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, storage: LocalStorage, token: Token<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>);
    private refresh;
    private getApplicationFromCache;
    private loadApplicationInfo;
    initialize(appId?: string | null, projection?: EntityDict['application']['Selection']['data']): Promise<void>;
    getApplication(): Partial<import("../oak-app-domain/Application/Schema").Schema> | undefined;
    getApplicationId(): string;
    uploadWechatMedia(params: {
        applicationId: string;
        file: File;
        type: MediaType;
        isPermanent?: boolean;
        description?: MediaVideoDescription;
    }): Promise<ReturnType<(AD & CommonAspectDict<ED, Cxt>)["uploadWechatMedia"]>>;
}
