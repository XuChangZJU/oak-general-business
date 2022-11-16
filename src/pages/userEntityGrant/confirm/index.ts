
export default OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relation: 1,
        granterId: 1,
        granter: {
            id: 1,
            name: 1,
        },
    },
    isList: false,
    formData: async ({ data: userEntityGrant }) => {
        return {
            relation: userEntityGrant?.relation,
        };
    },
    methods: {
        async handleConfirm() {
            await this.addOperation({
                action: 'confirm',
                data: {},
            });
            return this.execute();
        },
    },
});