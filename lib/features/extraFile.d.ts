import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { DeduceCreateOperationData } from 'oak-domain/lib/types';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { Cache } from 'oak-frontend-base/lib/features/cache';
import { Application } from './application';
export declare class ExtraFile<ED extends EntityDict, Cxt extends BackendRuntimeContext<ED>, FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>, AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>> extends Feature {
    private cache;
    private application;
    constructor(cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>, application: Application<ED, Cxt, FrontCxt, AD>);
    private getUploadInfo;
    upload(extraFile: DeduceCreateOperationData<EntityDict['extraFile']['OpSchema']>): Promise<{
        url: string;
        bucket: string;
    }>;
    getUrl(extraFile?: EntityDict['extraFile']['OpSchema'] | null, style?: string): string;
    formatBytes(size: number): string;
}
