import { composeFileUrl } from '../../../../src/utils/extraFile';

OakPage({
    path: 'mobile:me',
    entity: 'mobile',
    isList: true,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    formData: async ({ data: mobiles }) => ({
        mobiles,
    }),
    methods: {
        async onRefreshMobile(e: any) {
            this.setState({
                refreshing: true,
            });
            try {
                console.log(e.detail.code);
            }
            catch (err) {
                console.error(err);
            }
            this.setState({
                refreshing: false,
            });
        }
    }
});