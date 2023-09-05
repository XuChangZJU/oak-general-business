export default OakComponent({
    isList: false,
    entity: 'subscription',
    projection: {
        id: 1,
        name: 1,
        config: 1,
    },
    formData({ data }) {
        return data || {};
    },
    methods: {},
});
