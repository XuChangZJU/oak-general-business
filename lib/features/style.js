"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class Style extends oak_frontend_base_1.Feature {
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
exports.Style = Style;
