import { EntityDict } from '../../../oak-app-domain';
export default OakComponent({
    entity: 'messageTypeSmsTemplate',
    isList: true,
    projection: {
        id: 1,
        templateId: 1,
        template: {
            id: 1,
            origin: 1,
            systemId: 1,
            templateName: 1,
            templateCode: 1,
        },
        type: 1,
    },
    properties: {
        systemId: '' as string,
        origin: '' as string,
    },
    data: {
        smsTemplates: [] as Partial<EntityDict['smsTemplate']['Schema']>[],
    },
    formData({ data }) {
        const operations = this.getOperations();
        const dirtyIds = operations
            ? operations
                .map(
                    (ele) =>
                        (
                            ele.operation
                                .data as EntityDict['messageTypeSmsTemplate']['CreateSingle']['data']
                        )?.id || ele.operation.filter?.id
                )
                .filter((ele) => !!ele)
            : ([] as string[]);
        const selectedTypes = data ? data.filter((ele) => !ele.$$deleteAt$$).map((ele) => { ele.type }) : [];
        return {
            mtt: data,
            dirtyIds,
            selectedTypes,
        };
    },
    filters: [
        {
            filter() {
                const { systemId, origin } = this.props;
                return {
                    template: {
                        origin,
                        systemId,
                    }
                };
            },
        },
    ],
    listeners: {
        async 'selectedTypes'(prev, next) {
            if (next.selectedTypes) {
                await this.updateMessageTypes(next.selectedTypes);
            }
        },
    },
    lifetimes: {
        async ready() {
            const { systemId, origin } = this.props;
            const { data: smsTemplates } = await this.features.cache.refresh('smsTemplate', {
                data: {
                    id: 1,
                    origin: 1,
                    systemId: 1,
                    templateName: 1,
                    templateCode: 1,
                    templateContent: 1,
                },
                filter: {
                    origin,
                    systemId,
                }
            });
            this.setState({
                smsTemplates
            })
        },
    },
    methods: {
        async syncTemplate() {
            const { systemId, origin } = this.props;
            await this.features.template.syncSmsTemplate(systemId!, origin!);
            const { data: smsTemplates } = await this.features.cache.refresh('smsTemplate', {
                data: {
                    id: 1,
                    origin: 1,
                    systemId: 1,
                    templateName: 1,
                    templateCode: 1,
                    templateContent: 1,
                },
                filter: {
                    systemId,
                    origin
                }
            });
            this.setState({
                smsTemplates
            })
            this.setMessage(
                {
                    content: '操作成功',
                    type: 'success',
                }
            )
        },
        async updateMessageTypes(selectedTypes: string[]) {
            const { result: MessageTypes } = await this.features.template.getMessageType();
            const messageTypes = MessageTypes
                .filter((ele: string) => !selectedTypes.includes(ele));
            this.setState(
                {
                    messageTypes,
                }
            )
        }
    }
});
