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
    methods: {},
});
