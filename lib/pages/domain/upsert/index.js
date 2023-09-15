"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    entity: 'domain',
    projection: {
        id: 1,
        systemId: 1,
        url: 1,
        apiPath: 1,
        port: 1,
        protocol: 1,
    },
    formData({ data }) {
        return data || {};
    },
    lifetimes: {
        ready() {
            const { systemId, oakId } = this.props;
            if (!oakId) {
                if (systemId) {
                    this.update({ systemId });
                }
            }
            if (systemId) {
                this.update({ systemId });
            }
        },
    },
    methods: {
        async confirm() {
            await this.execute();
            this.navigateBack();
        },
    },
});
