"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Style2 = void 0;
const oak_frontend_base_1 = require("oak-frontend-base");
class Style2 extends oak_frontend_base_1.Feature {
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
exports.Style2 = Style2;
