
const SEND_KEY = 'captcha:sendAt';
export default OakComponent({
    isList: false,
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
    properties: {
        onlyCaptcha: Boolean,
        onlyPassword: Boolean,
        eventLoggedIn: String,
    },
    async formData({ features }) {
        const lastSendAt = features.localStorage.load(SEND_KEY);
        const now = Date.now();
        let counter = 0;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(60 - Math.ceil((now - lastSendAt) / 1000), 0);
            if (counter > 0) {
                (this as any).counterHandler = setTimeout(() => this.reRender(), 1000);
            }
            else if ((this as any).counterHandler) {
                clearTimeout((this as any).counterHandler);
                (this as any).counterHandler = undefined;
            }
        }
        return {
            counter,
        };
    },
    methods: {
        onInput(e: any) {
            const { dataset, value } = this.resolveInput(e);
            const { attr } = dataset;
            this.setState({
                [attr]: value,
            });
        },
        async sendCaptcha() {
            const { mobile } = this.state;
            try {
                const result = await this.features.token.sendCaptcha(mobile);
                // 显示返回消息
                this.setMessage({
                    type: 'success',
                    content: result,
                });
                this.save(SEND_KEY, Date.now());
                this.reRender();
            }
            catch (err) {
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        },
        async loginByMobile() {
            const { eventLoggedIn } = this.props;
            const { mobile, password, captcha } = this.state;
            try {
                await this.features.token.loginByMobile(mobile, password, captcha);
                if (eventLoggedIn) {
                    this.pub(eventLoggedIn);
                }
                else {
                    this.navigateBack();
                }
            }
            catch (err) {
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        }
    },
});