import { Action, Feature } from 'oak-frontend-base/lib/types/Feature';
import { AspectWrapper, DeduceCreateOperationData } from 'oak-domain/lib/types';
import { Upload } from 'oak-frontend-base/lib/utils/upload';
import { CommonAspectDict } from 'oak-common-aspect';
import { AspectDict } from '../aspects/AspectDict';
import { EntityDict } from '../general-app-domain';
import { RuntimeContext } from '../context/RuntimeContext';
import { Config as ConfigDef } from '../types/Config';

export class Config<
    ED extends EntityDict,
    Cxt extends RuntimeContext<ED>,
    AD extends AspectDict<ED, Cxt>
> extends Feature {
    private aspectWrapper: AspectWrapper<ED, Cxt, AD>;

    constructor(aspectWrapper: AspectWrapper<ED, Cxt, AD>) {
        super();
        this.aspectWrapper = aspectWrapper;
    }
    
    @Action
    async updateConfig(
        entity: 'platform' | 'system',
        entityId: string,
        config: ConfigDef,
    ) {
        await this.aspectWrapper.exec('updateConfig', {
            entity,
            entityId,
            config
        });
    }
}
