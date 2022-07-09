import { composeFileUrl } from '../../../../src/utils/extraFile';

const SEND_KEY = 'captcha:sendAt';
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
        counter: 0,
    },
    async formData({ features }) {
        const lastSendAt = features.localStorage.load(SEND_KEY);
        const now = Date.now();
        let counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(60 - Math.ceil((now - lastSendAt) / 1000), 0);
            if (counter > 0) {
                this.counterHandler = setTimeout(() => this.reRender(), 1000);
            }
            else if (this.counterHandler) {
                clearTimeout(this.couuterHandler);
                this.counterHandler = undefined;            
            }
        }
        return {
            counter,
        };
    },
    methods: {
        onInput(e: any) {
            const { dataset, value } = this.resolveInput(e);
            const{ attr } = dataset;
            this.setState({
                [attr]: value,
            });
        },
        async sendCaptcha() {
            const { mobile } = this.state;
            const result = await this.features.token.sendCaptcha(mobile);
            // 显示返回消息
            this.setState({
                oakError: {
                    type: 'success',
                    msg: result,
                }
            });
            this.save(SEND_KEY, Date.now());
            this.reRender();
        },
        async loginByMobile() {
            const { eventLoggedIn } = this.props;
            const { mobile, password, captcha } = this.state;
            await this.features.token.loginByMobile(mobile, password, captcha);
            this.pub(eventLoggedIn);
        }
    },
});