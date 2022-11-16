import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';

export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relation: 1,
        granterId: 1,
        granter: {
            id: 1,
            name: 1,
            nickname: 1,
        },
        expired: 1,
        expiresAt: 1,
        entity: 1,
        entityId: 1,
        type: 1,
        granteeId: 1,
        number: 1,
        confirmed: 1,
    },
    isList: false,
    formData: async ({ data: userEntityGrant, features }) => {
        const userId = await features.token.getUserId(true);
        return {
            relation: userEntityGrant?.relation,
            type: userEntityGrant?.type,
            expired: userEntityGrant?.expired,
            expiresAt: userEntityGrant?.expiresAt,
            granter: userEntityGrant?.granter,
            entity: userEntityGrant?.entity,
            entityId: userEntityGrant?.entityId,
            granteeId: userEntityGrant?.granteeId,
            number: userEntityGrant?.number,
            confirmed: userEntityGrant?.confirmed,
            userId,
        };
    },
    observers: {
        relation: function (relation) {
            if (relation) {
                this.getUserRelations();
            }
        },
    },
    methods: {
        async getUserRelations() {
            const { entity, entityId, relation } = this.state;
            const entityStr = firstLetterUpperCase(entity!);
            const userId = await this.features.token.getUserId();

            const { data } = await this.features.cache.refresh(
                `user${entityStr}`,
                {
                    data: {
                        id: 1,
                        userId: 1,
                        relation: 1,
                        [`${entity}Id`]: 1,
                    },
                    filter: {
                        userId: userId,
                        [`${entity}Id`]: entityId,
                        relation,
                    },
                }
            );
            this.setState({
                isExists: data.length > 0,
            });
        },

        async handleConfirm() {
            const { oakId } = this.props;
            await this.execute({
                action: 'confirm',
                data: {},
                filter: {
                    id: oakId,
                },
            });
        },
    },
});
