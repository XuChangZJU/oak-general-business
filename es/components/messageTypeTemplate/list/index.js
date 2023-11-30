import MessageTypes from '../../../config/messageType';
export default OakComponent({
    entity: 'messageTypeTemplate',
    isList: true,
    projection: {
        id: 1,
        templateId: 1,
        template: {
            id: 1,
            wechatId: 1,
            title: 1,
        },
        type: 1,
    },
    properties: {
        applicationId: '',
    },
    data: {
        wechatPublicTemplates: [],
    },
    formData({ data }) {
        const operations = this.getOperations();
        const dirtyIds = operations
            ? operations
                .map((ele) => ele.operation
                .data?.id || ele.operation.filter?.id)
                .filter((ele) => !!ele)
            : [];
        console.log(MessageTypes);
        const selectedTypes = data ? data.map((ele) => ele.type) : [];
        const messageTypes = MessageTypes
            .filter((ele) => !selectedTypes.includes(ele));
        return {
            mtt: data,
            dirtyIds,
            messageTypes,
        };
    },
    filters: [
        {
            filter() {
                const { applicationId } = this.props;
                if (applicationId) {
                    return {
                        template: {
                            applicationId,
                        }
                    };
                }
                return {};
            },
        },
    ],
    lifetimes: {
        async ready() {
            const applicationId = this.props.applicationId;
            const { data: wechatPublicTemplates } = await this.features.cache.refresh('wechatPublicTemplate', {
                data: {
                    id: 1,
                    wechatId: 1,
                    title: 1,
                },
                filter: {
                    applicationId,
                }
            });
            this.setState({
                wechatPublicTemplates
            });
        },
    },
    methods: {
        async syncTemplate() {
            const applicationId = this.props.applicationId;
            await this.features.template.syncMessageTemplate(applicationId);
            const { data: wechatPublicTemplates } = await this.features.cache.refresh('wechatPublicTemplate', {
                data: {
                    id: 1,
                    wechatId: 1,
                    title: 1,
                },
                filter: {
                    applicationId,
                }
            });
            this.setState({
                wechatPublicTemplates
            });
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
        }
    }
});
