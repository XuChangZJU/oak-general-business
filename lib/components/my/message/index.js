"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    lifetimes: {
        attached() {
            this.getMessageCount();
        },
    },
    data: {
        count: 0,
    },
    methods: {
        goMessageList() {
            this.navigateTo({
                url: '/message/list',
            });
        },
        async getMessageCount() {
            const userId = this.features.token.getUserId(true);
            if (userId) {
                const result = await this.features.cache.count('message', {
                    filter: {
                        userId,
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
