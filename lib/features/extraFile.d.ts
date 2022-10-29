import { Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
export declare class ExtraFile<ED extends EntityDict, Cxt extends RuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature {
    private aspectWrapper;
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>);
    private getUploadInfo;
    upload(extraFile: DeduceCreateOperationData<EntityDict['extraFile']['OpSchema']>): Promise<{
        url: string;
        bucket: string;
    }>;
}
