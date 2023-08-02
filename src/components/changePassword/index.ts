export default OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
    },
    formData: function ({ data: user, features, props }) {
        return {
            user,
        };
    },
    data: {
        channels: [] as string[],
    },
    lifetimes: {
        async attached() {
            const userId = this.props.oakId as string;
            const channels = await this.features.cache.exec('getChangePasswordChannels', {
                userId,
            });
        }
    },
    methods: {},
});
