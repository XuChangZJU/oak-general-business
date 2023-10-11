"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class Template extends oak_frontend_base_1.Feature {
    cache;
    constructor(cache) {
        super();
        this.cache = cache;
    }
    async syncMessageTemplate(applicationId) {
        const result = await this.cache.exec('syncMessageTemplate', {
            applicationId
        });
        console.log(result);
        this.publish();
    }
}
exports.Template = Template;
