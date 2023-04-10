import { EntityDict } from '../../../general-app-domain';

export default OakComponent({
    entity: 'messageTypeTemplateId',
    isList: true,
    projection: {
        id: 1,
        applicationId: 1,
        templateId: 1,
        type: 1,
    },
    properties: {
        applicationId: '' as string,
    },
    formData({ data }) {
        const operations = this.getOperations();
        const dirtyIds = operations
            ? operations
                  .map(
                      (ele) =>
                          (
                              ele.operation
                                  .data as EntityDict['messageTypeTemplateId']['CreateSingle']['data']
                          )?.id || ele.operation.filter?.id
                  )
                  .filter((ele) => !!ele)
            : ([] as string[]);

        const selectedTypes = data ? data.map((ele) => ele.type) : [];
        const messageTypes = this.features.cache
            .get('messageType', {
                data: {
                    id: 1,
                    type: 1,
                },
            })
            .map((ele) => ele.type!)
            .filter((ele: string) => !selectedTypes.includes(ele));

        return {
            mttIds: data,
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
                        applicationId,
                    };
                }
                return {};
            },
        },
    ],
    lifetimes: {
        ready() {
            this.features.cache.refresh('messageType', {
                data: {
                    id: 1,
                    type: 1,
                },
            });
        },
    },
});
