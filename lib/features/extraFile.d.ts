import { EntityDict } from 'oak-app-domain';
import { Feature } from 'oak-frontend-base';
import { Aspect, Context, DeduceCreateOperationData } from 'oak-domain/lib/types';
export declare class ExtraFile<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    constructor();
    upload(extraFile: DeduceCreateOperationData<ED['extraFile']['Schema']>, scene: string): Promise<any>;
}
