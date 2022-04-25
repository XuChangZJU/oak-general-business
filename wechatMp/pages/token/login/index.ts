
OakPage({
    path: 'token-login',
    entity: 'token',
    projection: {
        id: 1,
        name: 1,
        depth: 1,
        level: 1, 
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
            const code = await wx.login();
            console.log(code);
        },

        onReturnClicked() {
            wx.navigateBack();
        }
    }
});