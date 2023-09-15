"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("oak-domain/lib/utils/assert");
const uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
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
    lifetimes: {
        attached() {
            this.subscribed.push(this.features.token.subscribe(() => this.reRender()));
            this.subscribed.push(this.features.cache.subscribe(() => this.reRender()));
        },
    },
    methods: {
        logout() {
            this.features.token.logout();
        },
        updateAttribute(attr, value) {
            const { userId } = this.state;
            (0, assert_1.assert)(userId);
            return this.features.cache.operate('user', {
                id: (0, uuid_1.generateNewId)(),
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
