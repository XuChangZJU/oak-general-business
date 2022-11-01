const SEND_KEY = 'captcha:sendAt';
const LOGIN_AGREED = 'login:agreed';
const LOGIN_MODE = 'login:mode';

export default OakComponent({
    isList: false,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        password: '',
        captcha: '',
        counter: 0,
        loginAgreed: false,
        loginMode: 2,
        loading: false,
    },
    properties: {
        onlyCaptcha: Boolean,
        onlyPassword: Boolean,
        eventLoggedIn: String,
        backUrl: String, //回调url
    },
    async formData({ features }) {
        const application = await features.application.getApplication();
        const appId = application?.config?.wechat?.appId;

        const loginAgreed = features.localStorage.load(LOGIN_AGREED);
        const loginMode = features.localStorage.load(LOGIN_MODE) || 2;
        const lastSendAt = features.localStorage.load(SEND_KEY);
        const now = Date.now();
        let counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(60 - Math.ceil((now - lastSendAt) / 1000), 0);
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
            loginAgreed,
            loginMode,
            appId,
        };
    },
    methods: {
        async sendCaptcha() {
            const { mobile } = this.state;
            try {
                const result = await this.features.token.sendCaptcha(mobile);
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
            const { eventLoggedIn, backUrl } = this.props;
            const { mobile, password, captcha, loginAgreed } = this.state;
            if (!loginAgreed) {
                this.setMessage({
                    type: 'info',
                    content: '请阅读并同意《服务条款》和《隐私政策》',
                });
                return;
            }
            try {
                this.setState({
                    loading: true,
                });
                await this.features.token.loginByMobile(
                    mobile,
                    password,
                    captcha
                );
                this.setState({
                    loading: false,
                });
                if (eventLoggedIn) {
                    this.pub(eventLoggedIn);
                    return;
                }
                if (backUrl) {
                    window.location.replace(backUrl);
                    return;
                }
                this.navigateBack();
            } catch (err) {
                this.setState({
                    loading: false,
                });
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        },
        setLoginAgreed(checked: boolean) {
            this.features.localStorage.save(LOGIN_AGREED, checked);
            this.setState({
                loginAgreed: checked,
            });
        },
        setMode(value: number) {
            this.features.localStorage.save(LOGIN_MODE, value);
            this.setState({
                loginMode: value,
            });
        },
        goPage(type: 'service' | 'privacy') {
            const { width } = this.props as any;
            switch (type) {
                case 'service':
                    if (width !== 'xs') {
                        window.open('');
                    } else {
                        this.navigateTo({
                            url: '',
                        });
                    }
                    break;
                case 'privacy':
                    if (width !== 'xs') {
                        window.open('');
                    } else {
                        this.navigateTo({
                            url: '',
                        });
                    }
                    break;
                default:
                    break;
            }
        },
    },
});
