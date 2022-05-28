
OakPage({
    path: 'userEntityGrant:upsert',
    entity: 'userEntityGrant',
    
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        action: 1,
        remark: 1,
        uuid: 1,
        granterId: 1,
        granteeId: 1,
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
        ready() {
            this.setUpdateData('entity', this.data.entity);
            this.setUpdateData('entityId', this.data.entityId);
            this.setUpdateData('action', 'grant');
            this.setData({
                relationArr: JSON.parse(this.data.relations),
            })
        }
    },
    methods: {
        radioChange(e: WechatMiniprogram.RadioGroupChange) {
            this.setUpdateData('relation', e.detail.value);
        },
        handleConfirm() {
            try {
                this.execute(
                    this.data.oakId ? 'update' : 'create',
                    () => {
                    }
                );
            }
            catch (error) {
                console.log(error);
            }
        }
    }
});