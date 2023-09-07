import { Feature } from 'oak-frontend-base';
export class Config extends Feature {
    cache;
    constructor(cache) {
        super();
        this.cache = cache;
    }
    async updateConfig(entity, entityId, config) {
        await this.cache.exec('updateConfig', {
            entity,
            entityId,
            config,
        });
        this.publish();
    }
    async updateApplicationConfig(entity, entityId, config) {
        await this.cache.exec('updateApplicationConfig', {
            entity,
            entityId,
            config,
        });
        this.publish();
    }
}
