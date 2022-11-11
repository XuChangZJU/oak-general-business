export default OakComponent({
    isList: false,
    entity: 'system',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        super: 1,
    },
    async formData({ data }) {
        return data || {};
    },
    methods: {
    },
});
