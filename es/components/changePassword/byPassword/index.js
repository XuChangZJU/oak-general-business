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
        async ready() { }
    },
    methods: {
        async onConfirm(prevPassword, newPassword) {
            const userId = this.props.oakId;
            const { result } = await this.features.cache.exec('updateUserPassword', {
                userId,
                prevPassword,
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
        },
    },
});
