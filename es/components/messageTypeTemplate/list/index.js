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
        wechatTemplates: [],
    },
    formData({ data }) {
        const operations = this.getOperations();
        const dirtyIds = operations
            ? operations
                .map((ele) => ele.operation
                .data?.id || ele.operation.filter?.id)
                .filter((ele) => !!ele)
            : [];
        const selectedTypes = data ? data.map((ele) => ele.type) : [];
        return {
            mtt: data,
            dirtyIds,
            selectedTypes,
        };
    },
    listeners: {
        async 'selectedTypes'(prev, next) {
            if (next.selectedTypes) {
                await this.updateMessageTypes(next.selectedTypes);
            }
        },
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
            const { data: wechatTemplates } = await this.features.cache.refresh('wechatTemplate', {
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
                wechatTemplates
            });
        },
    },
    methods: {
        async syncTemplate() {
            const applicationId = this.props.applicationId;
            await this.features.template.syncMessageTemplate(applicationId);
            const { data: wechatTemplates } = await this.features.cache.refresh('wechatTemplate', {
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
                wechatTemplates
            });
            this.setMessage({
                content: '操作成功',
                type: 'success',
            });
        },
        async updateMessageTypes(selectedTypes) {
            const { result: MessageTypes } = await this.features.template.getMessageType();
            const messageTypes = MessageTypes
                .filter((ele) => !selectedTypes.includes(ele));
            this.setState({
                messageTypes,
            });
        }
    }
});
