import URL from 'url';

export default OakComponent({
    isList: false,
    data: {
        error: '',
        loading: false
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
                loading: true
            })
            const { features } = this;
            const token = await features.token.getToken(true);
            // 解析url
            let url = decodeURIComponent(window.location.href);
            if (this.strCharPosition(url, '?') > 1) {
                const startStr = url.substring(0, url.lastIndexOf('?'));
                let endStr = url.substring(url.lastIndexOf('?'));
                if (process.env.NODE_ENV === 'production') {
                    endStr = endStr.replace(/&/g, '%26');
                }
                url = startStr + endStr;
            }
            const parsedUrl = URL.parse(url, true);
            //console.warn('parsedUrl: '+ JSON.stringify(parsedUrl))
            const query = parsedUrl?.query;
            const code = query?.code;
            const state = query?.state;
            if (!code) {
                this.setState({
                    error: '缺少code参数',
                    loading: false,
                });
                return;
            }
            //解析state里面的数据
            //console.warn('state', state)
            const parsedState = URL.parse(decodeURIComponent(state as string), true);
            //console.warn('parsedPathUrl'+ parsedPathUrl)
            const stateQuery = parsedState?.query;
            const pathname = parsedState?.pathname;

            if (
                process.env.NODE_ENV === 'production' &&
                token
            ) {
                //token有效 不调用登录
                console.log('token有效');
                this.setState({
                    loading: false,
                });
                if (!state) {
                    this.redirectTo({
                        url: '/',
                    });
                    return;
                }
                if (stateQuery?.backUrl) {
                    window.location.replace(stateQuery?.backUrl as string);
                    return;
                }
                // 如果 stateQuery 存在isGoBack为 返回上一页
                if (stateQuery?.isGoBack) {
                    this.navigateBack({
                        delta: -2,
                    });
                    return;
                }
                this.redirectTo(
                    {
                        url: pathname!,
                    },
                    stateQuery
                );
            } else {
                console.log('token不存在或失效');
                try {
                    // web微信扫码跟公众号授权
                    await features.token.loginWechat(code as string);
                    // 如果 stateQuery 存在isGoBack为true 返回上一页
                    this.setState({
                        loading: false,
                    });
                    if (!state) {
                        this.redirectTo({
                            url: '/',
                        });
                        return;
                    }
                    if (stateQuery?.backUrl) {
                        window.location.replace(stateQuery?.backUrl as string);
                        return;
                    }
                    // 如果 stateQuery 存在isGoBack为 返回上一页
                    if (stateQuery?.isGoBack) {
                        this.navigateBack({
                            delta: -2,
                        });
                        return;
                    }
                    this.redirectTo(
                        {
                            url: pathname!,
                        },
                        stateQuery
                    );
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