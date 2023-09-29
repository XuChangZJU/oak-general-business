export default OakComponent({
    isList: false,
    entity: 'platform',
    projection: {
        id: 1,
        name: 1,
        config: 1,
        description: 1,
        style: 1,
    },
    formData({ data }) {
        return data || {};
    },
});
