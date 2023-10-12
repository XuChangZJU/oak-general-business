import { Feature } from 'oak-frontend-base';
export class Template extends Feature {
    cache;
    constructor(cache) {
        super();
        this.cache = cache;
    }
    async syncMessageTemplate(applicationId) {
        const result = await this.cache.exec('syncMessageTemplate', {
            applicationId
        });
        this.publish();
    }
}
