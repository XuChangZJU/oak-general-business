
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
            const token = this.features.token.getToken(true);
            const url = window.location.href;
            const urlParse = new URL(url);
            //格式 xx?code=xx&state=/xx/xx?d=xx
            const code = urlParse?.searchParams?.get('code') as string;
            const state = urlParse?.searchParams?.get('state') as string;
            const wechatLoginId = urlParse?.searchParams?.get('wechatLoginId') as string;
            if (!code) {
                this.setState({
                    error: this.t('missingCodeParameter'),
                    loading: false,
                });
                return;
            }

            if (
                process.env.NODE_ENV === 'production' &&
                token?.ableState === 'enabled'
            ) {
                this.setState({
                    loading: false,
                });
                this.go(state);
            } else {
                try {
                    // web微信扫码跟公众号授权
                    await this.features.token.loginWechat(code, {
                        wechatLoginId,
                    });
                    this.setState({
                        loading: false,
                    });
                    this.go(state);
                } catch (err) {
                    this.setState({
                        error: this.t('weChatLoginFailed'),
                        loading: false,
                    });
                    throw err;
                }
            }
        },
        go(state?: string) {
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