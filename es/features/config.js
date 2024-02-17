import { Feature } from 'oak-frontend-base/es/types/Feature';
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
    async updateStyle(entity, entityId, style) {
        await this.cache.exec('updateStyle', {
            entity,
            entityId,
            style,
        });
        this.publish();
    }
}
