"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    formData: async (tokenList, features) => {
        const tokenValue = await features.token.getToken();
        if (tokenValue) {
            return {
                loggedIn: true,
            };
        }
        return {
            loggedIn: false,
        };
    },
}, {
    methods: {
        async onLoginClicked(options) {
            const { code } = await wx.login();
            const env = await wx.getSystemInfo();
            await this.features.token.loginWechatMp('token:login');
        },
        onReturnClicked() {
            wx.navigateBack();
        }
    }
});
