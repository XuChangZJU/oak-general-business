export default OakComponent({
    isList: true,
    entity: 'wechatPublicTag',
    projection: {
        id: 1,
        applicationId: 1,
        text: 1,
        wechatId: 1,
    },
    formData({ data: rows }) {
        return {
            rows,
        };
    },
    pagination: {
        pageSize: 10,
        currentPage: 1,
        more: true,
    },
    lifetimes: {},
    filters: [
        {
            filter() {
                const { applicationId } = this.props;
                return {
                    applicationId
                };
            },
        }
    ],
    properties: {
        news: [],
        applicationId: '',
        getTag: (data) => undefined,
    },
    data: {},
    methods: {}
});
