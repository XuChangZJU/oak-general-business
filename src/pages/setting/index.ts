
export default OakComponent({
    isList: false,
    formData({ features }) {
        const userId = features.token.getUserId(true);
        return {
            userId,
        };
    },
    methods: {
        logout() {
            this.features.token.logout();
            this.navigateTo(
                {
                    url: '/login',
                },
                undefined,
                true
            );
        },
        setVisible() {
            this.setMessage({
                type: 'warning',
                content: '功能开发中',
            });
        },
        goMyInfo() {
            this.navigateTo(
                {
                    url: '/user',
                },
                undefined,
                true
            );
        },
    },
});
