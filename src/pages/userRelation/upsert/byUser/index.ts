import { EntityDict } from '../../../../general-app-domain';

export default OakComponent({
    isList: false,
    properties: {
        entity: '' as keyof EntityDict,
        entityId: '',
    },
    data: {
        relations: [] as EntityDict['relation']['OpSchema'][],
    },
    lifetimes: {
        async ready() {
            const { entity, entityId } = this.props;
            const isRoot = this.features.token.isRoot();
            const filter: EntityDict['relation']['Selection']['filter'] = {
                entity: entity as string,
                $or: [
                    {
                        entityId,
                    },
                    {
                        entityId: {
                            $exists: false,
                        },
                    }
                ],
            };
            if (!isRoot) {
                const userId = this.features.token.getUserId();
                filter.id = {
                    $in: {
                        entity: 'relationAuth',
                        data: {
                            destRelationId: 1,
                        },
                        filter: {
                            sourceRelationId: {
                                $in: {
                                    entity: 'userRelation',
                                    data: {
                                        relationId: 1,
                                    },
                                    filter: {
                                        userId,
                                    },
                                },
                            },
                        },
                    },
                };
            }
            const { data: relations } = await this.features.cache.refresh('relation', {
                data: {
                    id: 1,
                    entity: 1,
                    entityId: 1,
                    name: 1,
                    display: 1,
                },
                filter,
            });
            this.setState({
                relations: relations as EntityDict['relation']['OpSchema'][],
            });
        }
    },
    methods: {
        onConfirm() {
            this.execute();
        },
        onReset() {
            this.clean();
        }
    }
});
