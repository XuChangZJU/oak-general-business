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
        },
        isList: true,
        properties: {
            scene: String,
        },
        filters: [
            {
                filter: ({ props }) => {
                    const scene = decodeURIComponent(props.scene!);
                    const uuid = scene && expandUuidTo36Bytes(scene!);
                    return {
                        id: uuid!,
                    };
                },
            },
        ],
        formData: function({ data: wechatQrCodes }) {
            const wechatQrCode = wechatQrCodes[0];
            if (!wechatQrCode) {
                return {
                    isExist: false,
                };
            }
            if (!wechatQrCode.expired) {
                const { props, pathname } = wechatQrCode!.props!;
                let url =
                    pathname.substring(0, 1) === '/'
                        ? pathname
                        : `/${pathname}`;
                if (props) {
                    for (const param in props) {
                        const param2 = param as unknown as keyof typeof props;
                        url += url.includes('?') ? '&' : '?';
                        url += `${param}=${
                            typeof props[param2] === 'string'
                                ? props[param2]
                                : JSON.stringify(props[param2])
                        }`;
                    }
                }
                this.redirectTo({
                    url: url,
                });
                return {
                    expired: false,
                };
            } else {
                return {
                    expired: true,
                };
            }
        },
    }
);