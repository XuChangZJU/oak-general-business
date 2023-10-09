"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'system',
    isList: true,
    projection: {
        id: 1,
        name: 1,
    },
    properties: {
        platformId: '',
    },
    formData({ data }) {
        return {
            systems: data || [],
        };
    }
});
