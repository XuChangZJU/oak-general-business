
export default OakComponent({
    entity: 'message',
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
    },
    isList: false,
    formData: ({ data: message }) => {
        return message || {};
    },
    observers: {
        'visitState,userId': function (visitState, userId) {
            const userId2 = this.features.token.getUserId(true);
            if (userId === userId2) {
                if (visitState === 'unvisited') {
                    this.execute('visit', false);
                }
            }
        },
    },
    methods: {
        goPage() {
            const { params } = this.state;
            const pathname = params?.pathname;
            const props = params?.props || {};
            const state = params?.state;
            if (!pathname) {
                return;
            }

            this.redirectTo(
                {
                    url: pathname,
                    ...props,
                },
                state,
                true
            );
        },
    },
});
