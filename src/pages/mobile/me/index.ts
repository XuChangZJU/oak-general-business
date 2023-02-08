import assert from "assert";

export default OakComponent({
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    filters: [
        {
            filter() {
                const token = this.features.token.getToken();
                return {
                    userId: {
                        $in: {
                            entity: 'token',
                            data: {
                                userId: 1,
                            },
                            filter: {
                                id: token?.id,
                                ableState: 'enabled',
                            },
                        },
                    },
                };
            },
        },
    ],
    formData: ({ data: mobiles }) => {
        return {
            mobiles,
            allowRemove: mobiles.length > 1,
        };
    },
    data: {
        confirmDeleteModalVisible: false,
        refreshing: false,
        deleteIdx: undefined,
    },
    properties: {
        showBack: Boolean,
    },
    methods: {
        async onRefreshMobile(e: any) {
            this.setState({
                refreshing: true,
            });
            try {
                const { code, errMsg } = e.detail;
                if (errMsg !== 'getPhoneNumber:ok') {
                    console.error(errMsg);
                    this.setMessage({
                        title: '获取手机号失败',
                        type: 'warning',
                    });
                } else {
                    assert(code);
                    console.log(code);
                }
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
            });
            this.navigateTo({
                url: '/mobile/login',
                eventLoggedIn,
            });
        },
    },
});