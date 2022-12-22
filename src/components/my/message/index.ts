
export default OakComponent({
    isList: false,
    lifetimes: {
        attached() {
            this.getMessageCount();
        },
    },
    data: {
        count: undefined,
    },
    methods: {
        goMessageList() {
            this.navigateTo({
                url: '/message/list',
            });
        },
        async getMessageCount() {
            const userId = this.features.token.getUserId(true);
            const application = this.features.application.getApplication();
            const { systemId } = application;
            if (userId) {
                const result = await this.features.cache.count('message', {
                    data: {
                        id: 1,
                    },
                    filter: {
                        userId,
                        systemId,
                        visitState: 'unvisited',
                    },
                });
               this.setState({
                   count: result,
               });
            }
        },
    },
});
