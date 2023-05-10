"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'wechatLogin',
    projection: {
        id: 1,
        expired: 1,
        expiresAt: 1,
        userId: 1,
        type: 1,
        qrCodeType: 1,
        successed: 1,
    },
    isList: false,
    formData: function (_a) {
        var wechatLogin = _a.data, features = _a.features;
        var loginUserId = features.token.getUserId(true);
        var user = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.user;
        var userId = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.userId;
        var type = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.type;
        return {
            type: type,
            userId: userId,
            expired: wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.expired,
            expiresAt: wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.expiresAt,
            successed: wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.successed,
            loginUserId: loginUserId,
        };
    },
    listeners: {},
    methods: {},
});
