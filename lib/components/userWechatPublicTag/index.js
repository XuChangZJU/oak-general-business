"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    properties: {
        applicationId: '',
    },
    lifetimes: {
        async ready() {
            const { applicationId } = this.props;
        }
    },
    methods: {},
});
