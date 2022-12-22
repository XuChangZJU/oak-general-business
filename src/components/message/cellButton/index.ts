export default OakComponent({
    entity: 'message',
    isList: false,
    formData({ data }) {
        return {};
    },
    actions: ['visit'],
    methods: {
        async tapAction(action: string) {
            const { oakId: id } = this.props;
            switch (action) {
                case 'visit': {
                    this.execute('visit', false);
                    break;
                }
                default: {
                    break;
                }
            }
        },
    },
});
