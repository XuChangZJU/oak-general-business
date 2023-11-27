import { EntityDict } from '../../../oak-app-domain';

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
        applicationId: '' as string,
    },
    data: {
        wechatPublicTemplates: [] as Partial<EntityDict['wechatPublicTemplate']['Schema']>[],
    },
    formData({ data }) {
        const operations = this.getOperations();
        const dirtyIds = operations
            ? operations
                .map(
                    (ele) =>
                        (
                            ele.operation
                                .data as EntityDict['messageTypeTemplate']['CreateSingle']['data']
                        )?.id || ele.operation.filter?.id
                )
                .filter((ele) => !!ele)
            : ([] as string[]);

        const selectedTypes = data ? data.map((ele) => ele.type) : [];
        const messageTypes = this.features.template.getMessageType()
            .filter((ele: string) => !selectedTypes.includes(ele));
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
            this.features.cache.refresh('messageType', {
                data: {
                    id: 1,
                    type: 1,
                },
            });
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
            })
        },
    },
    methods: {
        async syncTemplate() {
            const applicationId = this.props.applicationId;
            await this.features.template.syncMessageTemplate(applicationId!);
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
            })
            this.setMessage(
                {
                    content: '操作成功',
                    type: 'success',
                }
            )
        }
    }
});
