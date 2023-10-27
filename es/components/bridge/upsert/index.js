export default OakComponent({
    entity: 'bridge',
    isList: false,
    data: {
        period: 7,
        bridgeId: '',
        options: [],
        searchValue: '',
    },
    properties: {
        entity: '',
        entityId: '',
        redirectTo: undefined,
    },
    lifetimes: {
        ready() { },
    },
    formData: ({ data }) => {
        return {};
    },
    methods: {
        setPeriod(period) {
            this.setState({
                period,
            });
        },
        setInit() {
            this.setState({
                bridgeId: '',
                searchValue: '',
                period: 7,
            });
        },
        async confirm() {
            const { entityId, entity, redirectTo } = this.props;
            const { period } = this.state;
            const time = period * 24 * 60 * 60 * 1000;
            if (!period) {
                this.setMessage({
                    type: 'error',
                    content: '请选择',
                });
                return;
            }
            this.update({
                entityId,
                entity,
                expiresAt: Date.now() + time,
                expired: false,
                redirectTo,
            });
            const id = this.getId();
            this.execute();
            this.setState({
                bridgeId: id,
            });
        },
    },
});
