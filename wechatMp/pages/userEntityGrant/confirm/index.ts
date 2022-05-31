
OakPage({
    path: 'userEntityGrant:confirm',
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        action: 1,
        remark: 1,
        granterId: 1,
        expired: 1,
        granteeId: 1,
    },
    isList: false,
    formData: async ({data: userEntityGrant}) => {
        return {
            relation: userEntityGrant?.relation,
        }
    },
}, {
    data: {
    },
    lifetimes: {
    },
    methods: {
        handleConfirm() {
            this.execute('confirm');
        }
    }
});