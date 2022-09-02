import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { GeneralRuntimeContext } from '../RuntimeContext';
export declare class ExtraFile<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>);
    getUploadInfo(origin: string, key?: string): Promise<import("oak-frontend-base/lib/types/Upload").QiniuUploadInfo>;
    upload(extraFile: DeduceCreateOperationData<EntityDict['extraFile']['OpSchema']>): Promise<{
        url: string;
        bucket: string;
    }>;
}
