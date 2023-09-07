import { OakUserInvisibleException } from 'oak-domain/lib/types';
export default OakComponent({
    isList: false,
    properties: {
        showBack: false,
        userId: '',
    },
    data: {
        currentUserId: '',
    },
    lifetimes: {
        attached() {
            const { userId } = this.props;
            const currentUserId = this.features.token.getUserId(true);
            if (!currentUserId) {
                this.setMessage({
                    type: 'error',
                    content: '您尚未登录',
                });
                this.navigateTo({
                    url: '/login',
                }, undefined, true);
                return;
            }
            if (userId && currentUserId) {
                if (userId !== currentUserId) {
                    const isRoot = this.features.token.isRoot();
                    if (!isRoot) {
                        throw new OakUserInvisibleException();
                    }
                }
            }
            this.setState({
                currentUserId,
            });
        },
    },
});
