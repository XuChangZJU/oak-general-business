
export default OakComponent({
    entity: 'parasite',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        expired: 1,
        expiresAt: 1,
        userId: 1,
    },
    isList: false,
    formData: ({ data: parasite, props }) => {
        const hostname = window.location.hostname;
        const port = window.location.port ? `:${window.location.port}` : '';
        const colon = window.location.protocol.endsWith(':') ? '' : ':';
        const url = `${window.location.protocol}${colon}//${hostname}${port}/parasite/excess?oakId=${props.oakId}`;
        return {
            entity: parasite?.entity,
            url,
            expired: parasite?.expired,
            expiresAt: parasite?.expiresAt,
        };
    },
    methods: {
        copy(text: string) {
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