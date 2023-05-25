import { Url } from "url";
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
            let url = decodeURIComponent(window.location.href);
            if (this.strCharPosition(url, '?') > 1) {
                const startStr = url.substring(0, url.lastIndexOf('?'));
                let endStr = url.substring(url.lastIndexOf('?'));
                if (process.env.NODE_ENV === 'production') {
                    endStr = endStr.replace(/&/g, '%26');
                }
                url = startStr + endStr;
            }
            const urlObj = new URL(url);
            //console.warn('urlObj: '+ JSON.stringify(urlObj))
            //格式 xx?code=xx&state=/xx/xx?d=xx
            const code = urlObj.searchParams.get('code');
            const state = urlObj.searchParams.get('state') as string;
            const wechatLoginId = urlObj.searchParams.get('wechatLoginId') as string;

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
                this.go(state);
            } else {
                console.log('token不存在或失效');
                try {
                    // web微信扫码跟公众号授权
                    await features.token.loginWechat(code as string, { wechatLoginId });
                    this.setState({
                        loading: false,
                    });
                    this.go(state);
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
            //解析state里面的数据
            //console.log('state', state)
            if (!state) {
                this.redirectTo({
                    url: '/',
                });
                return;
            }
            const { URL } = require('url');
            const stateObj = new URL(decodeURIComponent(state as string));
            // console.log('stateObj' + JSON.stringify(stateObj));
            const pathname = stateObj?.pathname;
            const backUrl = stateObj.searchParams.get('backUrl');
            const isGoBack = stateObj.searchParams.get('isGoBack');

            const urlSearchParams = new URLSearchParams(stateObj.search);
            const stateQuery = Object.fromEntries(urlSearchParams.entries());
            if (backUrl) {
                // todo 现在不存在跨域名登录 不需要使用window.location.replace
                // window.location.replace(stateQuery?.backUrl as string);
                this.redirectTo({
                    url: backUrl as string,
                });
                return;
            }
            // 如果stateQuery存在isGoBack为true 返回上一页
            if (isGoBack) {
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