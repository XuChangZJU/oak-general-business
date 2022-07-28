
export default OakPage(
    {
        path: 'userRelation:chooseMethod',
        properties: {
            entity: String,
            entityId: String,
            relations: Array,
        },
        methods: {
            goQrcodeShare() {
                const { entity, entityId, relations } = this.props;
                this.navigateTo({
                    url: '/userEntityGrant/grant',
                    entity,
                    entityId,
                    relations,
                    type: 'grant'
                })
            },
            goUpsert() {
                const { entity, entityId, relations } = this.props;
                this.navigateTo({
                    url: '/userRelation/upsert',
                    entity,
                    entityId,
                    relations,
                })
            }
        },
    }
);
