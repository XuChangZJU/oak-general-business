"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("oak-domain/lib/types");
exports.default = OakComponent({
    isList: false,
    properties: {
        showBack: false,
        userId: '',
    },
    data: {
        currentUserId: '',
    },
    lifetimes: {
        attached: function () {
            var userId = this.props.userId;
            var currentUserId = this.features.token.getUserId(true);
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
                    var isRoot = this.features.token.isRoot();
                    if (!isRoot) {
                        throw new types_1.OakUserInvisibleException();
                    }
                }
            }
            this.setState({
                currentUserId: currentUserId,
            });
        },
    },
});
