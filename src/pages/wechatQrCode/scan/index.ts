import { expandUuidTo36Bytes } from 'oak-domain/lib/utils/uuid'


export default OakComponent(
    {
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
            expiresAt: 1,
        },
        isList: true,
        properties: {
            scene: String,
        },
        data: {
            loading: true,
        },
        filters: [
            {
                filter() {
                    const scene = decodeURIComponent(this.props.scene!);
                    const uuid = scene && expandUuidTo36Bytes(scene!);
                    return {
                        id: uuid! || 'illegal',
                    };
                },
            },
        ],
        formData: function({ data: wechatQrCodes, props }) {
            const wechatQrCode = wechatQrCodes[0];
            if (!wechatQrCode) {
                return {
                    loading: false,
                    isExist: false,
                };
            }

            const scene = decodeURIComponent(props.scene!);
            const uuid = scene && expandUuidTo36Bytes(scene!);
            if (wechatQrCode.id !== uuid) {
                return {
                    loading: false,
                    isExist: false,
                };
            }
            else if (!wechatQrCode.expired) {
                const { props = {}, state = {}, pathname } = wechatQrCode!.props!;
                const url =
                    pathname.substring(0, 1) === '/'
                        ? pathname
                        : `/${pathname}`;

                this.redirectTo(
                    {
                        url: url,
                        ...props,
                    },
                    state
                );
                return {
                    loading: false,
                    expired: false,
                };
            } else {
                return {
                    loading: false,
                    expired: true,
                };
            }
        },
    }
);