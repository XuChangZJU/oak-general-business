
OakPage({
    path: 'userEntityGrant:detail',
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
        wechatQrCode$entity: {
            $entity: 'wechatQrCode',
            data: {
                entity: 1,
                entityId: 1,
                type: 1,//类型
                expiresAt: 1,// 过期时间
                expired: 1, //是否过期
                autoExtend: 1,
                sceneStr: 1,
                ticket: 1,
                url: 1,
                isPermanent: 1, //是否永久码
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
    formData: async ([userEntityGrant]) => ({
        ...userEntityGrant,
    }),
}, {
    data: {
    },
    lifetimes: {
        ready(options) {
            if (!this.data.wechatQrCode$entity[0] || this.data.wechatQrCode$entity[0].expiresAt) {
                //请求创建wechatQrcode
            }
        }
    },
    methods: {
    }
});