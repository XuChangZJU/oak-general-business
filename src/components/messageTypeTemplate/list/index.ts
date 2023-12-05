import { EntityDict } from '../../../oak-app-domain';
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
        applicationId: '' as string,
    },
    data: {
        wechatTemplates: [] as Partial<EntityDict['wechatTemplate']['Schema']>[],
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
        const messageTypes = MessageTypes
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
            })
        },
    },
    methods: {
        async syncTemplate() {
            const applicationId = this.props.applicationId;
            await this.features.template.syncMessageTemplate(applicationId!);
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
