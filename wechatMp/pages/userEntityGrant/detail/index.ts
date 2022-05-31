
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
                ticket: 1,
                url: 1,
                buffer: 1,
            },
            filter: {
                entity: 'userEntityGrant',
                expired: false,
            },
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData: async ({ data: userEntityGrant}) => ({
        relation: userEntityGrant && userEntityGrant.relation,
        qrcodeUrl: userEntityGrant && userEntityGrant.wechatQrCode$entity[0]
            && userEntityGrant.wechatQrCode$entity[0].url || 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(userEntityGrant.wechatQrCode$entity[0].buffer)
    }),
}, {
    data: {
    },
    lifetimes: {
    },
    methods: {
    }
});