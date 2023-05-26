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
        go(state?: string | string[]) {
            if (!state) {
                this.redirectTo({
                    url: '/',
                });
                return;
            }
            //需要对backUrl进行处理
            let url = state;
            if (url.indexOf('backUrl') > 0) {
                url =
                    '?backUrl=' +
                    encodeURIComponent((url as string).replace('?backUrl=', ''));
            }
            //解析state里面的数据
            const stateObj = URL.parse(url as string, true);
            const stateQuery = stateObj?.query;
            const pathname = stateObj?.pathname;

            if (stateQuery?.backUrl) {
                // todo 现在不存在跨域名登录 不需要使用window.location.replace
                // window.location.replace(stateQuery?.backUrl as string);
                this.redirectTo({
                    url: stateQuery?.backUrl as string,
                });
                return;
            }
            // 如果stateQuery存在isGoBack为true 返回上一页
            if (stateQuery?.isGoBack) {
                this.navigateBack(2);
                return;
            }
            this.redirectTo(
                {
                    url: pathname!,
                },
                stateQuery
            );
        },
        strCharPosition(str: string, char: string) {
            let pos: number;
            const arr: number[] = [];
            pos = str.indexOf(char);
            while (pos > -1) {
                arr.push(pos);
                pos = str.indexOf(char, pos + 1);
            }
            return arr.length;
        },
    },
});