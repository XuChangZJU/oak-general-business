export default OakComponent({
    isList: false,
    entity: 'application',
    formData({ data }) {
        return data || {};
    },
});
