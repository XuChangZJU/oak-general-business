import { LOCAL_STORAGE_KEYS } from '../../../config/constants';
const SEND_KEY = LOCAL_STORAGE_KEYS.captchaSendAt;
const LOGIN_MODE = LOCAL_STORAGE_KEYS.loginMode;
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
        password: '',
        captcha: '',
        counter: 0,
        loginAgreed: false,
        loginMode: 2,
        loading: false,
    },
    properties: {
        onlyCaptcha: false,
        onlyPassword: false,
        disabled: '',
        redirectUri: '',
        url: '', // 登录成功后redirectTo的页面，不配置的话就认为是goBack
    },
    formData({ features, props }) {
        const application = features.application.getApplication();
        let loginMode = features.localStorage.load(LOGIN_MODE) || 2;
        const lastSendAt = features.localStorage.load(SEND_KEY);
        const now = Date.now();
        let counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(SEND_CAPTCHA_LATENCY - Math.ceil((now - lastSendAt) / 1000), 0);
            if (counter > 0) {
                this.counterHandler = setTimeout(() => this.reRender(), 1000);
            }
            else if (this.counterHandler) {
                clearTimeout(this.counterHandler);
                this.counterHandler = undefined;
            }
        }
        const appType = application?.type;
        const config = application?.config;
        let appId;
        let domain; //网站扫码 授权回调域
        let isSupportScan = false; //是否支持微信扫码登录
        let isSupportWechat = false; // 微信扫码网站登录
        let isSupportWechatPublic = false; // 微信扫码公众号登录
        let isSupportGrant = false; // 是否支持微信公众号授权登录
        if (appType === 'wechatPublic') {
            const config2 = config;
            const isService = config2?.isService; //是否服务号 服务号才能授权登录
            appId = config2?.appId;
            isSupportGrant = !!(isService && appId);
            isSupportWechat = !!config2?.passport?.includes('wechat');
            isSupportWechatPublic = !!config2?.passport?.includes('wechatPublic'); //是否开启
        }
        else if (appType === 'web') {
            const config2 = config;
            appId = config2?.wechat?.appId;
            domain = config2?.wechat?.domain;
            isSupportWechat = !!config2?.passport?.includes('wechat');
            isSupportWechatPublic = !!config2?.passport?.includes('wechatPublic'); //是否开启
        }
        if (isSupportGrant) {
            loginMode = 1;
        }
        else if (props.onlyPassword) {
            loginMode = 1;
        }
        else if (props.onlyCaptcha) {
            loginMode = 2;
        }
        else {
            loginMode = loginMode === 3 && !isSupportScan ? 2 : loginMode;
        }
        return {
            counter,
            loginMode,
            appId,
            isSupportWechat,
            isSupportWechatPublic,
            isSupportGrant,
            domain,
        };
    },
    lifetimes: {
        attached() {
            // 如果已登录， 返回上一页
            const token = this.features.token.getTokenValue();
            if (token) {
                this.navigateBack();
            }
        },
    },
    methods: {
        async sendCaptcha(mobile) {
            try {
                const result = await this.features.token.sendCaptcha(mobile, 'login');
                // 显示返回消息
                this.setMessage({
                    type: 'success',
                    content: result,
                });
                this.save(SEND_KEY, Date.now());
                this.reRender();
            }
            catch (err) {
                this.setMessage({
                    type: 'error',
                    content: err.message,
                });
            }
        },
        async loginByMobile(mobile, password, captcha) {
            const { url } = this.props;
            try {
                this.setState({
                    loading: true,
                });
                await this.features.token.loginByMobile(mobile, password, captcha);
                this.setState({
                    loading: false,
                });
                if (url) {
                    this.redirectTo({
                        url,
                    });
                    return;
                }
                this.navigateBack();
            }
            catch (err) {
                this.setState({
                    loading: false,
                });
                this.setMessage({
                    type: 'error',
                    content: err.message,
                });
            }
        },
        setLoginMode(value) {
            this.features.localStorage.save(LOGIN_MODE, value);
            this.setState({
                loginMode: value,
            });
        },
    },
});
