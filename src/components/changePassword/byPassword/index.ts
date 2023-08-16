import dayjs from 'dayjs';
const SEND_KEY = 'captcha:sendAt';
const SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;

export default OakComponent({
    isList: false,
    entity: 'user',
    projection: {
        id: 1,
        name: 1,
        nickname: 1,
    },
    formData: function ({ data: user, features, props }) {
        return {
            user,
        };
    },
    data: {
        failTimes: 0,
    },
    lifetimes: {
        async ready() {
            const userId = this.props.oakId as string;
            const { data: [lastSuccessfulTemp] } = await this.features.cache.refresh(
                'changePasswordTemp',
                {
                    data: {
                        id: 1,
                        $$seq$$: 1,
                    },
                    filter: {
                        userId,
                        $$createAt$$: {
                            $gt: dayjs().startOf('day').valueOf(),
                        },
                        result: 'success',
                    },
                    sorter: [
                        {
                            $attr: {
                                $$seq$$: 1,
                            },
                            $direction: 'desc',
                        },
                    ],
                    indexFrom: 0,
                    count: 1,
                },
            )
            const { data: failTempList } = await this.features.cache.refresh(
                'changePasswordTemp',
                {
                    data: {
                        id: 1,
                    },
                    filter: lastSuccessfulTemp ? {
                        userId,
                        $$seq$$: {
                            $gt: lastSuccessfulTemp.$$seq$$!,
                        },
                        result: 'fail',
                    } : {
                        userId,
                        $$createAt$$: {
                            $gt: dayjs().startOf('day').valueOf(),
                        },
                        result: 'fail',
                    },
                },
            )
            this.setState(
                {
                    failTimes: failTempList.length,
                }
            )
        }
    },
    methods: {
        async onConfirm(prevPassword: string, newPassword: string) {
            const userId = this.props.oakId as string;
            const { result } = await this.features.cache.exec('updateUserPassword', {
                userId,
                prevPassword,
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
        },
    },
});
