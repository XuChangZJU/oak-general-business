import { assert } from 'oak-domain/lib/utils/assert';
import { generateNewId } from 'oak-domain/lib/utils/uuid';
export default OakComponent({
    isList: false,
    formData({ features }) {
        const userInfo = features.token.getUserInfo();
        if (userInfo) {
            const { id, nickname, name, mobile$user, idState, userState, gender, } = userInfo;
            const mobileText = mobile$user.length > 1
                ? this.t('moreThanOne')
                : mobile$user.length == 1
                    ? mobile$user[0].mobile
                    : this.t('unset');
            return {
                nameText: nickname || name,
                mobileText,
                userId: id,
                nickname,
                name,
                idState,
                userState,
                gender,
            };
        }
        return {};
    },
    properties: {
        showLogout: false,
    },
    features: ['cache'],
    methods: {
        logout() {
            this.features.token.logout();
        },
        updateAttribute(attr, value) {
            const { userId } = this.state;
            assert(userId);
            return this.features.cache.operate('user', {
                id: generateNewId(),
                action: 'update',
                data: {
                    [attr]: value,
                },
                filter: {
                    id: userId,
                },
            });
        },
    },
});
