export default OakComponent({
    isList: false,
    entity: 'application',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        type: 1,
    },
    async formData({ data }) {
        return data || {};
    },
    methods: {
    },
});
