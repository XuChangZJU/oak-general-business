
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
    formData: (tokenList) => {
        if (tokenList.length > 0) {
            return {
                loggedIn: true,
            };
        }
        return {
            loggedIn: false,
        }
    },
}, {
    properties: {
        depth: Number,
    },
    methods: {
        async onLoginClicked(options: WechatMiniprogram.Touch) {
            const code = await wx.login();
        }
    }
});