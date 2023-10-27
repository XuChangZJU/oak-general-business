"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'bridge',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        expired: 1,
        expiresAt: 1,
    },
    isList: false,
    formData: ({ data: bridge, props }) => {
        const hostname = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : '';
        const colon = window.location.protocol.endsWith(':') ? '' : ':';
        const url = `${window.location.protocol}${colon}//${hostname}${port}/bridge/excess?oakId=${props.oakId}`;
        return {
            entity: bridge?.entity,
            url,
            expired: bridge?.expired,
            expiresAt: bridge?.expiresAt,
        };
    },
    methods: {
        copy(text) {
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    this.setMessage({
                        content: '复制成功',
                        type: 'success',
                    });
                });
            }
        },
    }
});
