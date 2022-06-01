import { expandUuidTo36Bytes } from 'oak-domain/lib/utils/uuid'


OakPage(
    {
        path: 'wechatQrCode:scan',
        entity: 'wechatQrCode',
        projection: {
            id: 1,
            entity: 1,
            entityId: 1,
            type: 1, //类型
            ticket: 1,
            url: 1,
            expired: 1,
            buffer: 1,
            props: 1,
        },
        isList: true,
        filters: [
            {
                filter: async ({ features, rest, onLoadOptions }) => {
                    const scene = decodeURIComponent(onLoadOptions.scene!);
                    const uuid = scene && expandUuidTo36Bytes(scene!);
                    return {
                        id: uuid!,
                    };
                },
            },
        ],
        formData: async ({ data: wechatQrCodes }) => {
            if (wechatQrCodes[0] && !wechatQrCodes[0]?.expired) {
                wx.navigateTo({
                    url: `${wechatQrCodes[0]?.props?.pathname}?oakId=${wechatQrCodes[0]?.props?.props?.id}`,
                });
            }
            return {};
        },
    },
    {
        data: {},
        lifetimes: {},
        methods: {},
    }
);