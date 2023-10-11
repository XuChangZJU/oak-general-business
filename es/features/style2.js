import { Feature } from 'oak-frontend-base';
export class Style2 extends Feature {
    cache;
    constructor(cache) {
        super();
        this.cache = cache;
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
