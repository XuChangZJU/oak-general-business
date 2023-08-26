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
            const { features } = this;
            const token = features.token.getToken(true);
            // 解析url
            const url = window.location.href;
            const urlObj = URL.parse(url, true);
            //格式 xx?code=xx&state=/xx/xx?d=xx
            const query = urlObj?.query;
            const code = query?.code;
            const state = query?.state;
            const wechatLoginId = query?.wechatLoginId;
            if (!code) {
                this.setState({
                    error: '缺少code参数',
                    loading: false,
                });
                return;
            }

            if (process.env.NODE_ENV === 'production' && token) {
                //token有效 不调用登录
                console.log('token有效');
                this.setState({
                    loading: false,
                });
                this.go(state as string);
            } else {
                console.log('token不存在或失效');
                try {
                    // web微信扫码跟公众号授权
                    await features.token.loginWechat(code as string, {
                        wechatLoginId: wechatLoginId as string,
                    });
                    this.setState({
                        loading: false,
                    });
                    this.go(state as string);
                } catch (err) {
                    console.warn(err);
                    this.setState({
                        error: '微信登录失败',
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
                url: state as string,
            });
        },
    },
});