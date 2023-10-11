"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'application',
    formData({ data }) {
        return data || {};
    },
});
