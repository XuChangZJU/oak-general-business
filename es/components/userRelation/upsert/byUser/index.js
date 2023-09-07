export default OakComponent({
    isList: false,
    properties: {
        entity: '',
        entityId: '',
    },
    data: {
        relations: [],
    },
    lifetimes: {
        async ready() {
            const { entity, entityId } = this.props;
            const isRoot = this.features.token.isRoot();
            const filter = {
                entity: entity,
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
                filter.relationAuth$destRelation = {
                    sourceRelation: {
                        userRelation$relation: {
                            userId,
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
                relations: relations,
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
