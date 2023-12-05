import dayjs from 'dayjs';
import { LOCAL_STORAGE_KEYS } from '../../../config/constants';
const SEND_KEY = LOCAL_STORAGE_KEYS.captchaSendAt;
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;

export default OakComponent({
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
        const { lastSendAt } = this.state;
        if (typeof lastSendAt === 'number') {
            counter = Math.max(
                SEND_CAPTCHA_LATENCY - Math.ceil((Date.now() - lastSendAt) / 1000),
                0
            );
            if (counter > 0) {
                (this as any).counterHandler = setTimeout(
                    () => this.reRender(),
                    1000
                );
            } else if ((this as any).counterHandler) {
                clearTimeout((this as any).counterHandler);
                (this as any).counterHandler = undefined;
            }
        }
        return {
            user,
            counter,
            mobile: user?.mobile$user?.[0]?.mobile
        };
    },
    data: {
        channels: [] as string[],
        failTimes: 0,
        captcha: '',
        lastSendAt: undefined as number | undefined,
    },
    lifetimes: {
        async ready() {
            const lastSendAt = await this.load(SEND_KEY);
            if (lastSendAt) {
                this.setState({
                    lastSendAt,
                }, () => this.reRender())
            }
        }
    },
    methods: {
        async sendCaptcha(mobile: string) {
            try {
                const result = await this.features.token.sendCaptcha(mobile, 'changePassword');
                // 显示返回消息
                this.setMessage({
                    type: 'success',
                    content: result,
                });
                const lastSendAt = Date.now();
                this.save(SEND_KEY, lastSendAt);
                this.setState({
                    lastSendAt,
                }, () => this.reRender())
            } catch (err) {
                this.setMessage({
                    type: 'error',
                    content: (err as Error).message,
                });
            }
        },
        setCaptcha(value: string) {
            this.setState(
                {
                    captcha: value,
                }
            )
        },
        setMobile(value: string) {
            this.setState(
                {
                    mobile: value,
                }
            )
        },
        async onConfirmByMobile(mobile: string, captcha: string, newPassword: string) {
            const userId = this.props.oakId as string;
            const { user } = this.state;
            const { result } = await this.features.cache.exec('updateUserPassword', {
                userId,
                mobile,
                captcha,
                newPassword,
            });
            const { result: resultMessage, times } = result;
            if (resultMessage === 'success') {
                this.setMessage(
                    {
                        type: 'success',
                        content: '修改密码成功'
                    }
                )
                this.navigateBack();
            } else {
                if (times) {
                    this.setState(
                        {
                            failTimes: times,
                        }
                    )
                }
                this.setMessage(
                    {
                        type: 'error',
                        content: resultMessage
                    }
                )
            }
        }
    },
});
