import { composeFileUrl } from '../../../../src/utils/extraFile';

export default OakPage({
    path: 'mobile:me',
    entity: 'mobile',
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        password: '',
        captcha: '',
    },
    methods: {
        onInput(e) {
            const { dataset, value } = this.resolveInput(e);
            const{ attr } = dataset;
            this.setState({
                [attr]: value,
            });
        },
        async sendCaptcha(type: 'web') {
            const { mobile } = this.state;
            const result = await this.features.token.sendCaptcha(mobile, type);
            this.setState({
                oakError: {
                    type: 'success',
                    msg: result,
                }
            });
        }
    },
});