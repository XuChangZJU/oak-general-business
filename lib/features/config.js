"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class Config extends oak_frontend_base_1.Feature {
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
exports.Config = Config;
