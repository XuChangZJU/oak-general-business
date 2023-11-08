import { LOCAL_STORAGE_KEYS } from '../../../config/constants';
const SEND_KEY = LOCAL_STORAGE_KEYS.captchaSendAt;
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;

export default OakComponent({
    isList: false,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        captcha: '',
        counter: 0,
        refreshing: false,
        password: '',
    },
    properties: {
        onlyCaptcha: false,
        onlyPassword: false,
        eventLoggedIn: '',
        callback: undefined as ((() => void) | undefined),
    },
    formData({ features }) {
        const lastSendAt = features.localStorage.load(SEND_KEY);
        const now = Date.now();
        let counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(
                SEND_CAPTCHA_LATENCY - Math.ceil((now - lastSendAt) / 1000),
                0
            );
            if (counter > 0) {
                (this as any).counterHandler = setTimeout(
                    () => this.reRender(),
                    1000
                );
            } else if ((this as any).counterHandler) {
                clearTimeout((this as any).counterHandler);
                (this as any).counterHandler = undefined;
            }
        }
        return {
            counter,
        };
    },
    methods: {
        setMobile(value: string) {
            this.setState({
                mobile: value,
            });
        },
        setCaptcha(value: string) {
            this.setState({
                captcha: value,
            });
        },
        async sendCaptcha() {
            const { mobile } = this.state;
            try {
                const result = await this.features.token.sendCaptcha(mobile, 'login');
                // 显示返回消息
                this.setMessage({
                    type: 'success',
                    content: result,
                });
                this.save(SEND_KEY, Date.now());
                this.reRender();
            } catch (err) {
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        },
        async loginByMobile() {
            const { eventLoggedIn, callback } = this.props;
            const { mobile, password, captcha } = this.state;
            try {
                await this.features.token.loginByMobile(
                    mobile,
                    password,
                    captcha
                );
                if (typeof callback === 'function') {
                    callback();
                } else if (eventLoggedIn) {
                    this.pubEvent(eventLoggedIn);
                } else {
                    this.navigateBack();
                }
            } catch (err) {
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        },
        async onRefreshMobile(e: any) {
            this.setState({
                refreshing: true,
            });
            try {
                const { code, errMsg } = e.detail;
                if (errMsg !== 'getPhoneNumber:ok') {
                    console.error(errMsg);
                    this.setMessage({
                        title: '获取手机号失败',
                        type: 'warning',
                    });
                } else {
                    await this.features.token.getWechatMpUserPhoneNumber(code);
                }
            } catch (err) {
                console.error(err);
            }
            this.setState({
                refreshing: false,
            });
        },
    },
});