import URL from 'url';

export default OakComponent({
    isList: false,
    data: {
        error: '',
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
            const { t, features } = this;
            const token = await features.token.getToken();
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
            const { query } = parsedUrl || {};
            const { code, state } = query || {};
            if (!code || !state) {
                this.setState({
                    error: '缺少参数',
                });
                return;
            }
            //console.warn('state: '+ JSON.stringify(state))
            const parsedPathUrl = URL.parse(decodeURIComponent(state as string), true);
            //console.warn('parsedPathUrl: '+ JSON.stringify(parsedPathUrl))
            const { query: query2, pathname } = parsedPathUrl || {};

            if (
                process.env.NODE_ENV === 'production' &&
                token
            ) {
                //token有效 不调用登录
                console.log('token有效');
                // 如果 query2 存在isGoBack为true 返回上一页
                if (query2 && query2.isGoBack) {
                    this.navigateBack({
                        delta: -2,
                    });
                    return;
                }
                this.redirectTo(
                    {
                        url: pathname!,
                    },
                    query2
                );
            } else {
                console.log('token不存在或失效');
                try {
                    // web微信扫码跟公众号授权
                    await features.token.loginWechat(code as string);
                    // 如果 query2 存在isGoBack为true 返回上一页
                    if (query2 && query2.isGoBack) {
                        this.navigateBack({
                            delta: -2,
                        });
                        return;
                    }
                    this.redirectTo(
                        {
                            url: pathname!,
                        },
                        query2
                    );
                } catch (err) {
                    console.warn(err);
                    this.setState({
                        error: '微信登录失败',
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