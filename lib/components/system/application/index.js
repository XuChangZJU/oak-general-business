"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'application',
    isList: true,
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        type: 1,
    },
    properties: {
        systemId: '',
    },
    formData({ data }) {
        return {
            applications: data || [],
        };
    }
});
