"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
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
        pageSize: 20,
        currentPage: 1,
        more: false,
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
