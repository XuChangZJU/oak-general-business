"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../config/constants");
const SEND_KEY = constants_1.LOCAL_STORAGE_KEYS.captchaSendAt;
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;
exports.default = OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
            },
            filter: {
                ableState: 'enabled'
            }
        }
    },
    formData: function ({ data: user, features, props }) {
        let counter = 0;
        const lastSendAt = features.localStorage.load(SEND_KEY);
        if (typeof lastSendAt === 'number') {
            counter = Math.max(SEND_CAPTCHA_LATENCY - Math.ceil((Date.now() - lastSendAt) / 1000), 0);
            if (counter > 0) {
                this.counterHandler = setTimeout(() => this.reRender(), 1000);
            }
            else if (this.counterHandler) {
                clearTimeout(this.counterHandler);
                this.counterHandler = undefined;
            }
        }
        return {
            user,
            counter,
            mobile: user?.mobile$user?.[0]?.mobile
        };
    },
    data: {
        channels: [],
        failTimes: 0,
        captcha: '',
    },
    lifetimes: {},
    methods: {
        async sendCaptcha(mobile) {
            try {
                const result = await this.features.token.sendCaptcha(mobile, 'changePassword');
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
                    content: err.message,
                });
            }
        },
        setCaptcha(value) {
            this.setState({
                captcha: value,
            });
        },
        setMobile(value) {
            this.setState({
                mobile: value,
            });
        },
        async onConfirmByMobile(mobile, captcha, newPassword) {
            const userId = this.props.oakId;
            const { user } = this.state;
            const { result } = await this.features.cache.exec('updateUserPassword', {
                userId,
                mobile,
                captcha,
                newPassword,
            });
            const { result: resultMessage, times } = result;
            if (resultMessage === 'success') {
                this.setMessage({
                    type: 'success',
                    content: '修改密码成功'
                });
                this.navigateBack();
            }
            else {
                if (times) {
                    this.setState({
                        failTimes: times,
                    });
                }
                this.setMessage({
                    type: 'error',
                    content: resultMessage
                });
            }
        }
    },
});
