"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const Feature_1 = require("oak-frontend-base/es/types/Feature");
class Template extends Feature_1.Feature {
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
exports.Template = Template;
