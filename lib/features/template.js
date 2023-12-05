"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class Template extends oak_frontend_base_1.Feature {
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
