import { WechatMpEnv } from "general-app-domain/Token/Schema";

OakPage({
    path: 'token:login',
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
    formData: async ({ features }) => {
        const tokenValue = await features.token.getToken();
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
            await this.features.token.loginWechatMp('token:login');
        },

        onReturnClicked() {
            wx.navigateBack();
        }
    }
});