import { Feature } from 'oak-frontend-base/es/types/Feature';
export class Template extends Feature {
    cache;
    messageTypes;
    constructor(cache) {
        super();
        this.cache = cache;
        this.messageTypes = [];
    }
    async getMessageType() {
        return await this.cache.exec('getMessageType', {});
    }
    async syncMessageTemplate(applicationId) {
        const result = await this.cache.exec('syncMessageTemplate', {
            applicationId
        });
        this.publish();
    }
    async syncSmsTemplate(systemId, origin) {
        const result = await this.cache.exec('syncSmsTemplate', {
            systemId,
            origin,
        });
        this.publish();
    }
}
