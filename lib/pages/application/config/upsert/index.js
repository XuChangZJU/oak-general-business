"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        type: 1,
    },
    formData: function (_a) {
        var data = _a.data;
        return data || {};
    },
    methods: {},
});
