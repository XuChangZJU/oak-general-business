"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    methods: {
        goBack(delta) {
            this.navigateBack(delta);
        },
    },
});
