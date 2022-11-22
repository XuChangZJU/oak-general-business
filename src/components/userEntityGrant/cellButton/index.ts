export default OakComponent({
    entity: 'userEntityGrant',
    isList: false,
    formData({ data }) {
        return {};
    },
    actions: ['disable'],
    methods: {
        async tapAction(action: string) {
            const { oakId: id } = this.props;
            switch (action) {
                case 'disable': {
                    this.update({
                        expired: true,
                    }, 'disable');
                    this.execute();
                    break;
                }
                // case 'remove': {
                //     await this.addOperation({
                //         action: 'remove',
                //         data: {},
                //         filter: {
                //             id,
                //         },
                //     });
                //     this.execute();
                //     break;
                // }
                default: {
                    break;
                }
            }
        },
    },
});
