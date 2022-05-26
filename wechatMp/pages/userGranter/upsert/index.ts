
OakPage({
    path: 'userEntityGrant:upsert',
    entity: 'userEntityGrant',
    
    projection: {
        entity: 1,
        entityId: 1,
        relation: 1,
        action: 1,
        remark: 1,
        uuid: 1,
        granter: 1,
        grantee: 1,
    },
    isList: false,
    formData: async ([userEntityGrant]) => ({
        ...userEntityGrant
    }),
}, {
    properties: {
        entity: String,
        entityId: String,
        relations: String,
    },
    data: {
    },
    lifetimes: {
        ready(options) {
            this.setUpdateData('entity', this.data.entity);
            this.setUpdateData('entityId', this.data.entityId);
            this.setUpdateData('action', 'grant');
            this.setData({
                relationArr: JSON.parse(this.data.relations),
            })
        }
    },
    methods: {
        radioChange(e) {
            this.setUpdateData('relation', e.detail.value);
        }
    }
});