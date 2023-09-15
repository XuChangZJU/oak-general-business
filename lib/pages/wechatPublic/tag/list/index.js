"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'wechatPublicTag',
    isList: true,
    projection: {
        id: 1,
        text: 1,
        wechatId: 1,
        sync: 1,
        syncAt: 1,
        $$createAt$$: 1,
        $$updateAt$$: 1,
        $$seq$$: 1,
        userWechatPublicTag$wechatPublicTag$$aggr: {
            $entity: 'userWechatPublicTag',
            data: {
                '#count-1': {
                    id: 1,
                },
            },
        },
    },
    formData({ data }) {
        return {
            list: data,
        };
    },
    properties: {
        applicationId: '',
    },
    methods: {
        goCreate() {
            const { applicationId } = this.props;
            this.navigateTo({
                url: '/wechatPublic/tag/upsert',
                applicationId,
            });
        },
        goUpdate(id) {
        }
    }
});
