export default OakComponent({
    isList: false,
    entity: 'message',
    projection: {
        id: 1,
        $$createAt$$: 1,
        type: 1,
        title: 1,
        content: 1,
        visitState: 1,
        userId: 1,
        user: {
            id: 1,
            name: 1,
        },
        params: 1,
    },
    formData: function ({ data: message, features, props }) {
        return message || {};
    },
    methods: {},
    actions: ['visit'],
});
