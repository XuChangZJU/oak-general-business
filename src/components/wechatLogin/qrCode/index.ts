import { EntityDict } from '../../../general-app-domain';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';

const Interval = 2 * 60 * 1000;

export default OakComponent({
    isList: false,
    lifetimes: {
        async attached() {
            this.createWechatLogin();
            (this as any).createTimer = setInterval(() => {
                this.createWechatLogin();
            }, Interval);
        },
        async detached() {
            if ((this as any).createTimer) {
                clearInterval((this as any).createTimer);
            }
        },
    },
    data: {
        loading: false,
    },
    properties: {
        type: 'bind' as EntityDict['wechatLogin']['Schema']['type'],
    },
    methods: {
        async createWechatLogin() {
            const userId = this.features.token.getUserId();
            const wechatLoginId = await generateNewIdAsync();

            const { type = 'bind' } = this.props; 

            await this.features.cache.operate('wechatLogin', {
                id: await generateNewIdAsync(),
                action: 'create',
                data: {
                    id: wechatLoginId,
                    userId,
                    type,
                    expiresAt: Date.now() + Interval,
                    expired: false,
                    qrCodeType: 'wechatPublic',
                    successed: false,
                } as EntityDict['wechatLogin']['CreateSingle']['data'],
            });
            this.setState(
                {
                    wechatLoginId,
                },
                () => {
                    this.getWechatLogin();
                }
            );
        },
        async getWechatLogin() {
            const { wechatLoginId } = this.state;
            const {
                data: [wechatLogin],
            } = await this.features.cache.refresh('wechatLogin', {
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
                            type: 1, //类型
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

            let qrCodeUrl = wechatLogin?.wechatQrCode$entity![0]?.url;
            const buffer = wechatLogin?.wechatQrCode$entity![0]?.buffer;
            if (buffer) {
                const newBuffer = new ArrayBuffer(buffer.length * 2);
                const newBufferToUint16 = new Uint16Array(newBuffer);
                for (let i = 0; i < buffer.length; i++) {
                    newBufferToUint16[i] = buffer.charCodeAt(i);
                }

                if (process.env.OAK_PLATFORM === 'wechatMp') {
                    const base64Str = wx.arrayBufferToBase64(newBufferToUint16);
                    qrCodeUrl = 'data:image/png;base64,' + base64Str;
                } else {
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
            });
        },
    },
});
