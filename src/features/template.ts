import { Feature } from 'oak-frontend-base';
import AspectDict from '../aspects/AspectDict';
import { EntityDict } from '../oak-app-domain';
import { Cache } from 'oak-frontend-base/es/features/cache';
import { BackendRuntimeContext } from '../context/BackendRuntimeContext';
import { CommonAspectDict } from 'oak-common-aspect';
import { FrontendRuntimeContext } from '../context/FrontendRuntimeContext';
import { uniq } from 'oak-domain/lib/utils/lodash';

export class Template<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>,
    FrontCxt extends FrontendRuntimeContext<ED, Cxt, AD>,
    AD extends AspectDict<ED, Cxt> & CommonAspectDict<ED, Cxt>
> extends Feature {
    private cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>;
    private messageTypes: string[];
    constructor(
        cache: Cache<ED, Cxt, FrontCxt, AD & CommonAspectDict<ED, Cxt>>
    ) {
        super();
        this.cache = cache;
        this.messageTypes = [];
    }

    async getMessageType() {
        return await this.cache.exec('getMessageType', {});
    }
    async syncMessageTemplate(applicationId: string) {
        const result = await this.cache.exec('syncMessageTemplate', {
            applicationId
        });
        this.publish();
    }
    async syncSmsTemplate(systemId: string, origin: string) {
        const result = await this.cache.exec('syncSmsTemplate', {
            systemId,
            origin,
        });
        this.publish();
    }
} 
