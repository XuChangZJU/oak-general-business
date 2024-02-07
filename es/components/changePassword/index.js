const SEND_KEY = 'captcha:sendAt';
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;
export default OakComponent({
    isList: false,
    // entity: 'user',
    // projection: {
    //     id: 1,
    //     name: 1,
    //     nickname: 1,
    //     mobile$user: {
    //         $entity: 'mobile',
    //         data: {
    //             id: 1,
    //             mobile: 1,
    //         },
    //         filter: {
    //             ableState: 'enabled'
    //         }
    //     }
    // },
    // formData: function ({ data: user, features, props }) {
    //     return {
    //         user,
    //     };
    // },
    data: {
        channels: [],
        loading: false,
    },
    properties: {
        oakId: '',
    },
    lifetimes: {
        async attached() {
            const userId = this.props.oakId;
            this.setState({
                loading: true,
            });
            try {
                const { result } = await this.features.cache.exec('getChangePasswordChannels', {
                    userId: userId,
                });
                this.setState({
                    channels: result,
                    loading: false,
                });
            }
            catch {
                this.setState({
                    loading: false,
                    channels: [],
                });
            }
        },
    },
    methods: {
        goToMobile() {
            this.navigateTo({
                url: '/mobile/me',
            });
        },
    },
});
