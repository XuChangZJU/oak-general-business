"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        type: {
            type: String,
            value: 'fas',
        },
        size: {
            type: Number,
            optionalTypes: [Number, String],
            value: 0,
        },
        color: {
            type: String,
            value: 'primary',
        },
        name: {
            type: String,
            value: '',
        },
        larger: {
            type: String,
            value: '1x',
        },
    },
});
