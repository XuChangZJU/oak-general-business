
export default OakPage({
    path: 'mobile:me',
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    filters: [{
        filter: async ({ features }) => {           
            const tokenId = await features.token.getToken();
            return {
                user: {
                    id: {
                        $in: {
                            entity: 'token',
                            data: {
                                userId: 1,
                            },
                            filter: {
                                id: tokenId,
                                ableState: 'enabled',
                            }
                        }
                    }
                },
            };
        },
    }],
    formData: async ({ data: mobiles }) => ({
        mobiles,
    }),
    data: {
        confirmDeleteModalVisible: false,
        refreshing: false,
        deleteIdx: undefined,
    },
    methods: {
        async onRefreshMobile(e: any) {
            this.setState({
                refreshing: true,
            });
            try {
                console.log(e.detail.code);
            } catch (err) {
                console.error(err);
            }
            this.setState({
                refreshing: false,
            });
        },

        goAddMobile() {
            const eventLoggedIn = `mobile:me:login:${Date.now()}`;
            this.sub(eventLoggedIn, () => {
                this.navigateBack();
            })
            this.navigateTo({
                url: '/mobile/login',
                onlyCaptcha: true,    
                eventLoggedIn,
            });
        }
    },
});