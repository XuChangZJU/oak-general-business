"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    formData: function (_a) {
        var features = _a.features;
        var userId = features.token.getUserId(true);
        return {
            userId: userId,
        };
    },
    methods: {
        logout: function () {
            this.features.token.logout();
            this.navigateTo({
                url: '/login',
            }, undefined, true);
        },
        setVisible: function () {
            this.setMessage({
                type: 'warning',
                content: '功能开发中',
            });
        },
        goMyInfo: function () {
            this.navigateTo({
                url: '/user',
            }, undefined, true);
        },
    },
});
