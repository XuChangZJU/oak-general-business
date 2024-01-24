import { expandUuidTo36Bytes } from 'oak-domain/lib/utils/uuid';
export default OakComponent({
    entity: 'wechatQrCode',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        type: 1,
        ticket: 1,
        url: 1,
        expired: 1,
        props: 1,
        expiresAt: 1,
    },
    isList: true,
    properties: {
        scene: '',
        q: '',
    },
    data: {
        loading: false,
        illegal: false,
    },
    lifetimes: {
        attached() {
            this.setState({
                loading: true,
            });
            setTimeout(() => {
                this.setState({
                    loading: false,
                });
            }, 500);
        },
    },
    filters: [
        {
            filter() {
                let uuid;
                if (this.props.scene) {
                    // 小程序码扫码
                    const scene = decodeURIComponent(this.props.scene);
                    uuid = expandUuidTo36Bytes(scene);
                }
                else if (this.props.q) {
                    // 普通链接二维码扫码
                    const q = decodeURIComponent(this.props.q);
                    uuid = expandUuidTo36Bytes(q);
                }
                return {
                    id: uuid || 'illegal',
                };
            },
        },
    ],
    formData: function ({ data: wechatQrCodes, props }) {
        const wechatQrCode = wechatQrCodes[0];
        if (!wechatQrCode) {
            return {
                illegal: true,
            };
        }
        if (props.scene) {
            const scene = decodeURIComponent(props.scene);
            const uuid = expandUuidTo36Bytes(scene);
            if (wechatQrCode.id !== uuid) {
                return {
                    illegal: true,
                };
            }
        }

        if (props.q) {
            const q = decodeURIComponent(props.q);
            const uuid = expandUuidTo36Bytes(q);
            if (wechatQrCode.id !== uuid) {
                return {
                    illegal: true,
                };
            }
        }
        if (!wechatQrCode.expired) {
            const { props = {}, state = {}, pathname } = wechatQrCode.props;
            const url = pathname.substring(0, 1) === '/' ? pathname : `/${pathname}`;
            this.redirectTo({
                url: url,
                ...props,
            }, state);
            return {
                expired: false,
                illegal: false,
            };
        }
        else {
            return {
                expired: true,
                illegal: false,
            };
        }
    },
});
