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
    formData({ data: userEntityGrant, features }) {
        const userId = features.token.getUserId(true);
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
    methods: {
        handleConfirm() {
            return this.execute('confirm');
        },
    },
});
