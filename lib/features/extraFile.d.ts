import { EntityDict } from 'general-app-domain';
import { Feature } from 'oak-frontend-base';
import { AspectWrapper, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { AspectDict as CommonAspectDict } from 'oak-common-aspect/lib/aspectDict';
import { AspectDict } from '../aspects/aspectDict';
import { GeneralRuntimeContext } from '..';
export declare class ExtraFile<ED extends EntityDict, Cxt extends GeneralRuntimeContext<ED>, AD extends AspectDict<ED, Cxt>> extends Feature<ED, Cxt, AD & CommonAspectDict<ED, Cxt>> {
    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD & CommonAspectDict<ED, Cxt>>);
    upload(extraFile: DeduceCreateOperationData<EntityDict['extraFile']['OpSchema']>): Promise<{
        url: string;
        bucket: string;
    }>;
}
