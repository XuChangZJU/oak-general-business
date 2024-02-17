"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const Feature_1 = require("oak-frontend-base/es/types/Feature");
class Config extends Feature_1.Feature {
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
exports.Config = Config;
