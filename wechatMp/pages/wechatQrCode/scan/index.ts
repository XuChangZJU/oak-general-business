import { expandUuidTo36Bytes } from 'oak-domain/lib/utils/uuid'


OakPage({
    path: 'wechatQrCode:scan',
    entity: 'wechatQrCode',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        type: 1,//类型
        ticket: 1,
        url: 1,
        expired: 1,
        buffer: 1,
    },
    isList: true,
    filter: async (options) => {
        const scene = decodeURIComponent(options.scene);
        const uuid = expandUuidTo36Bytes(scene);
        return {
            id: uuid,
        }
    },
    formData: async ({data: wechatQrCodes}) => {
        const expired = wechatQrCodes[0]?.expired;
        if (!expired) {
            wx.navigateTo({
                url: `${wechatQrCodes[0].props.pathname}?oakId=${wechatQrCodes[0].props.props.id}`
            })
        }
    },
}, {
    data: {
    },
    lifetimes: {
    },
    methods: {
    }
});