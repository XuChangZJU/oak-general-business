"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SEND_KEY = 'captcha:sendAt';
var SEND_CAPTCHA_LATENCY = process.env.NODE_ENV === 'development' ? 10 : 60;
exports.default = OakComponent({
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
    formData: function (_a) {
        var _this = this;
        var _b, _c;
        var user = _a.data, features = _a.features, props = _a.props;
        var counter = 0;
        var lastSendAt = features.localStorage.load(SEND_KEY);
        if (typeof lastSendAt === 'number') {
            counter = Math.max(SEND_CAPTCHA_LATENCY - Math.ceil((Date.now() - lastSendAt) / 1000), 0);
            if (counter > 0) {
                this.counterHandler = setTimeout(function () { return _this.reRender(); }, 1000);
            }
            else if (this.counterHandler) {
                clearTimeout(this.counterHandler);
                this.counterHandler = undefined;
            }
        }
        return {
            user: user,
            counter: counter,
            mobile: (_c = (_b = user === null || user === void 0 ? void 0 : user.mobile$user) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.mobile
        };
    },
    data: {
        channels: [],
        failTimes: 0,
        captcha: '',
    },
    lifetimes: {},
    methods: {
        sendCaptcha: function (mobile) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var result, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.features.token.sendCaptcha(mobile, 'changePassword')];
                        case 1:
                            result = _a.sent();
                            // 显示返回消息
                            this.setMessage({
                                type: 'success',
                                content: result,
                            });
                            this.save(SEND_KEY, Date.now());
                            this.reRender();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_1.message,
                            });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        setCaptcha: function (value) {
            this.setState({
                captcha: value,
            });
        },
        setMobile: function (value) {
            this.setState({
                mobile: value,
            });
        },
        onConfirmByMobile: function (mobile, captcha, newPassword) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, user, result, resultMessage, times;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = this.props.oakId;
                            console.log(newPassword);
                            user = this.state.user;
                            return [4 /*yield*/, this.features.cache.exec('updateUserPassword', {
                                    userId: userId,
                                    mobile: mobile,
                                    captcha: captcha,
                                    newPassword: newPassword,
                                })];
                        case 1:
                            result = (_a.sent()).result;
                            resultMessage = result.result, times = result.times;
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
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
});
