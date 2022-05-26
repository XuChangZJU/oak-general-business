import { EntityDict } from 'oak-app-domain';
import { Feature } from 'oak-frontend-base';
import { Aspect, Context } from 'oak-domain/lib/types';
export declare class ExtraFile<ED extends EntityDict, Cxt extends Context<ED>, AD extends Record<string, Aspect<ED, Cxt>>> extends Feature<ED, Cxt, AD> {
    private rwLock;
    constructor();
    upload(extraFile: EntityDict['extraFile']['Schema'], scene: string): Promise<{
        url: string;
        bucket: string;
    } | undefined>;
}
