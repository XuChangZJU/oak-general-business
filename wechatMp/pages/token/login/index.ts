import { WechatMpEnv } from "oak-app-domain/Token/Schema";

OakPage({
    path: 'token-login',
    entity: 'token',
    projection: {
        id: 1,
        wechatUser: {
            id: 1,
        },
        userId: 1,
        playerId: 1,
    },
    isList: true,
    formData: (tokenList, features) => {
        const tokenValue = features.token.getToken();
        if (tokenValue) {
            return {
                loggedIn: true,
            };
        }
        return {
            loggedIn: false,
        }
    },
}, {
    methods: {
        async onLoginClicked(options: WechatMiniprogram.Touch) {
            const { code } = await wx.login();
            const env = await wx.getSystemInfo();
            await this.features.token.loginWechatMp(code, Object.assign(env, { type: 'wechatMp' }) as WechatMpEnv);
        },

        onReturnClicked() {
            wx.navigateBack();
        }
    }
});