
OakPage({
    path: 'userEntityGrant:confirm',
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relation: 1,
    },
    isList: false,
    formData: async ({data: userEntityGrant}) => {
        return {
            relation: userEntityGrant?.relation,
        }
    },    
    methods: {
        handleConfirm() {
            this.execute('confirm');
        }
    }
});