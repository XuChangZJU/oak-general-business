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
        router: 1,
    },
    isList: false,
    formData: ({ data: message }) => {
        return message || {};
    },
    listeners: {
        'visitState,userId'(prev, next) {
            const userId2 = this.features.token.getUserId(true);
            if (next.userId === userId2) {
                if (next.visitState === 'unvisited') {
                    this.execute('visit', false);
                }
            }
        },
    },
    methods: {
        goPage() {
            const { router } = this.state;
            const pathname = router?.pathname;
            const props = router?.props || {};
            const state = router?.state;
            if (!pathname) {
                return;
            }
            this.redirectTo({
                url: pathname,
                ...props,
            }, state, true);
        },
    },
});
