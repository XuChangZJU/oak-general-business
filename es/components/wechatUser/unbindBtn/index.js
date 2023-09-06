export default OakComponent({
    entity: 'wechatUser',
    isList: false,
    projection: {
        id: 1,
        userId: 1,
    },
    formData({ data }) {
        return {
            id: data?.id,
        };
    },
    lifetimes: {},
    data: {},
    properties: {},
    methods: {},
});
