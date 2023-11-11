export default OakComponent({
    isList: false,
    entity: 'subscription',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        entity: 1,
        entityId: 1,
    },
    formData({ data }) {
        return data || {};
    },
    properties: {
        entityId: '',
        entity: '',
    },
    lifetimes: {
        ready() {
            const { entityId, entity, oakId } = this.props;
            if (!oakId) {
                if (entityId) {
                    this.update({
                        entityId,
                        entity,
                    });
                }
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
