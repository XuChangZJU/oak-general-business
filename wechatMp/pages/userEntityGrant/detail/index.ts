
OakPage({
    path: 'userEntityGrant:detail',
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        action: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
        wechatQrCode$entity: {
            $entity: 'wechatQrCode',
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                type: 1,//类型
                expiresAt: 1,// 过期时间
                expired: 1, //是否过期
                ticket: 1,
                url: 1,
                buffer: 1,
            },
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData: async ([userEntityGrant]) => ({
        ...userEntityGrant,
    }),
}, {
    data: {
    },
    lifetimes: {
        ready() {
            if (!this.data.wechatQrCode$entity[0] || this.data.wechatQrCode$entity[0].expiresAt) {
                //请求创建wechatQrcode
            }
        }
    },
    methods: {
    }
});