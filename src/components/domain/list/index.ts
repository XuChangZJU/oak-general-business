export default OakComponent({
    isList: true,
    entity: 'domain',
    actions: ['update', 'create', 'remove'],
    projection: {
        id: 1,
        systemId: 1,
        url: 1,
        apiPath: 1,
        port: 1,
        protocol: 1,
    },
    properties: {
        systemId: '',
    },
    formData({ data }) {
        return {
            list: data,
        };
    },
    methods: {
    },
});
