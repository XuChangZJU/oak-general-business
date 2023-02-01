
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
        params: 1,
        props: 1,
    },
    filters: [
        {
            filter: ({ features, props }) => {
                const userId = features.token.getUserId(true);
                /* const application = features.application.getApplication();
                const { systemId } = application; */

                if (userId) {
                    return {
                        userId,
                        // systemId,
                        // visitState: 'unvisited',
                    };
                }
                else {
                    return {
                        $$createAt$$: 123,
                    };
                }
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
    lifetimes: {
        attached() {
            this.subscribed.push(
                this.features.token.subscribe(
                    () => this.reRender()
                )
            );
        }
    },
    methods: {
        goDetailById(id: string) {
            this.navigateTo({
                url: `/message/detail`,
                oakId: id,
            });
        },
    },
});
