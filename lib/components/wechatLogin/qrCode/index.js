"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Interval = 2 * 60 * 1000;
exports.default = OakComponent({
    isList: false,
    lifetimes: {
        async attached() {
            const { type } = this.props;
            this.createWechatLogin();
            this.createTimer = setInterval(() => {
                this.createWechatLogin();
            }, Interval);
            this.intervalId = setInterval(() => {
                this.getWechatLogin2();
            }, 1000);
        },
        async detached() {
            if (this.createTimer) {
                clearInterval(this.createTimer);
            }
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },
    },
    data: {
        intervalId: '',
        loading: false,
        successed: false,
    },
    properties: {
        type: 'bind',
        url: '',
    },
    methods: {
        async createWechatLogin() {
            const { type = 'bind' } = this.props;
            const { result: wechatLoginId } = await this.features.cache.exec('createWechatLogin', {
                type,
                interval: Interval,
            });
            this.setState({
                wechatLoginId,
            }, () => {
                this.getWechatLogin();
            });
        },
        async getWechatLogin() {
            const { wechatLoginId } = this.state;
            this.setState({
                loading: true,
            });
            const { data: [wechatLogin], } = await this.features.cache.refresh('wechatLogin', {
                data: {
                    id: 1,
                    userId: 1,
                    type: 1,
                    qrCodeType: 1,
                    remark: 1,
                    expired: 1,
                    expiresAt: 1,
                    successed: 1,
                    wechatQrCode$entity: {
                        $entity: 'wechatQrCode',
                        data: {
                            id: 1,
                            entity: 1,
                            entityId: 1,
                            type: 1,
                            ticket: 1,
                            url: 1,
                            buffer: 1,
                            expired: 1,
                            expiresAt: 1,
                            applicationId: 1,
                        },
                        filter: {
                            entity: 'wechatLogin',
                        },
                        indexFrom: 0,
                        count: 1,
                    },
                },
                filter: {
                    id: wechatLoginId,
                },
            });
            let qrCodeUrl = wechatLogin?.wechatQrCode$entity[0]?.url;
            const buffer = wechatLogin?.wechatQrCode$entity[0]?.buffer;
            if (buffer) {
                const newBuffer = new ArrayBuffer(buffer.length * 2);
                const newBufferToUint16 = new Uint16Array(newBuffer);
                for (let i = 0; i < buffer.length; i++) {
                    newBufferToUint16[i] = buffer.charCodeAt(i);
                }
                if (process.env.OAK_PLATFORM === 'wechatMp') {
                    const base64Str = wx.arrayBufferToBase64(newBufferToUint16);
                    qrCodeUrl = 'data:image/png;base64,' + base64Str;
                }
                else {
                    let binary = '';
                    const bytes = new Uint8Array(newBufferToUint16);
                    const len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    const base64Str = window.btoa(binary);
                    // const buffer2 = Buffer.from(newBufferToUint16, 'base64');
                    // const base64Str = buffer2.toString('base64');
                    qrCodeUrl = 'data:image/png;base64,' + base64Str;
                }
            }
            this.setState({
                qrCodeUrl,
                loading: false,
            });
        },
        // 每秒调取下面方法，监听用户是否已在微信端授权登录或绑定
        async getWechatLogin2() {
            const { wechatLoginId } = this.state;
            const { data: [wechatLogin], } = await this.features.cache.refresh('wechatLogin', {
                data: {
                    id: 1,
                    userId: 1,
                    type: 1,
                    qrCodeType: 1,
                    remark: 1,
                    expired: 1,
                    expiresAt: 1,
                    successed: 1,
                },
                filter: {
                    id: wechatLoginId,
                },
            });
            const { successed, type } = wechatLogin;
            this.setState({
                successed,
                type,
            }, async () => {
                // 未登录的情况下才走这里
                if (successed && type === 'login') {
                    await this.features.token.loginByWechatInWebEnv(wechatLoginId);
                    const { url } = this.props;
                    if (url) {
                        this.redirectTo({
                            url: url,
                        });
                        return;
                    }
                    this.navigateBack();
                }
            });
        },
    },
});
