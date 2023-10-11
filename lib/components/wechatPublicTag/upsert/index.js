"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        isUpdate: false,
        text: '',
        tagName: '',
        open: false,
        changeOpen: (open) => undefined,
        editTag: () => undefined,
        addTag: () => undefined,
        changeText: (text) => undefined,
    },
    methods: {}
});
