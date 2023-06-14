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
        var _b, _c;
        var wechatLogin = _a.data, features = _a.features;
        var loginUserId = features.token.getUserId(true);
        var user = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.user;
        var userId = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.userId;
        var type = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.type;
        var application = features.application.getApplication();
        var appId = (_c = (_b = application === null || application === void 0 ? void 0 : application.config) === null || _b === void 0 ? void 0 : _b.wechat) === null || _c === void 0 ? void 0 : _c.appId;
        return {
            type: type,
            userId: userId,
            expired: wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.expired,
            expiresAt: wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.expiresAt,
            successed: wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.successed,
            loginUserId: loginUserId,
            appId: appId,
        };
    },
    listeners: {},
    methods: {
        getCodeAndRedirect: function () {
            var state = encodeURIComponent("?backUrl=/wechatLogin/confirm?oakId=".concat(this.props.oakId));
            if (process.env.NODE_ENV === 'development') {
                this.navigateTo({
                    url: '/wechatUser/login',
                    wechatLoginId: this.props.oakId,
                    code: "CODE_".concat(Math.random()),
                    state: state,
                });
            }
            else {
                var appId = this.state.appId;
                var redirectUrl = "".concat(window.location.host, "/wechaUser/login?wechatLoginId=").concat(this.props.oakId);
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".concat(appId, "&state=").concat(state, "&redirect_uri=").concat(redirectUrl, "&response_type=code&scope=SCOPE#wechat_redirect");
            }
        }
    },
});
