export default OakComponent({
    entity: 'message',
    isList: true,
    projection: {
        id: 1,
        $$createAt$$: 1,
        type: 1,
        title: 1,
        content: 1,
        visitState: 1,
        userId: 1,
        user: {
            id: 1,
            name: 1,
        },
        router: 1,
    },
    filters: [
        {
            filter() {
                const userId = this.features.token.getUserId(true);
                if (!userId) {
                    return {
                        id: 'illegal',
                    };
                }
                return {
                    userId,
                };
            },
        },
    ],
    sorters: [
        {
            sorter: () => {
                return {
                    $attr: {
                        $$createAt$$: 1,
                    },
                    $direction: 'desc',
                };
            },
        },
    ],
    formData: function ({ data: messages, features, props }) {
        const pagination = this.getPagination();
        return {
            messages,
            pagination,
        };
    },
    methods: {
        goDetailById(id: string) {
            this.navigateTo({
                url: `/message/detail`,
                oakId: id,
            });
        },
        goMessageList() {
            this.navigateTo({
                url: '/message/list',
            });
        },
    },
});
