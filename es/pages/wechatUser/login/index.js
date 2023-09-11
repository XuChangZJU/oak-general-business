import URL from 'url';
export default OakComponent({
    isList: false,
    data: {
        error: '',
        loading: false,
    },
    lifetimes: {
        attached() {
            if (process.env.OAK_PLATFORM === 'web') {
                //处理微信授权登录
                this.login();
            }
        },
    },
    methods: {
        async login() {
            this.setState({
                loading: true,
            });
            const { features, t } = this;
            const token = features.token.getToken(true);
            const url = window.location.href;
            const urlParse = URL.parse(url, true);
            //格式 xx?code=xx&state=/xx/xx?d=xx
            const query = urlParse?.query;
            const code = query?.code;
            const state = query?.state;
            const wechatLoginId = query?.wechatLoginId;
            if (!code) {
                this.setState({
                    error: t('missingCodeParameter'),
                    loading: false,
                });
                return;
            }
            if (process.env.NODE_ENV === 'production' &&
                token?.ableState === 'enabled') {
                this.setState({
                    loading: false,
                });
                this.go(state);
            }
            else {
                try {
                    // web微信扫码跟公众号授权
                    await features.token.loginWechat(code, {
                        wechatLoginId,
                    });
                    this.setState({
                        loading: false,
                    });
                    this.go(state);
                }
                catch (err) {
                    this.setState({
                        error: t('weChatLoginFailed'),
                        loading: false,
                    });
                    throw err;
                }
            }
        },
        go(state) {
            if (!state) {
                this.navigateBack(2);
                return;
            }
            this.redirectTo({
                url: state,
            });
        },
    },
});
