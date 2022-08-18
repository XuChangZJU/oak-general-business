"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SEND_KEY = 'captcha:sendAt';
exports.default = OakPage({
    path: 'mobile:me',
    isList: false,
    projection: {
        id: 1,
        mobile: 1,
        userId: 1,
    },
    data: {
        mobile: '',
        password: '',
        captcha: '',
        counter: 0,
    },
    properties: {
        onlyCaptcha: Boolean,
        onlyPassword: Boolean,
        eventLoggedIn: String,
    },
    formData: function (_a) {
        var features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastSendAt, now, counter;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                lastSendAt = features.localStorage.load(SEND_KEY);
                now = Date.now();
                counter = 0;
                if (typeof lastSendAt === 'number') {
                    counter = Math.max(60 - Math.ceil((now - lastSendAt) / 1000), 0);
                    if (counter > 0) {
                        this.counterHandler = setTimeout(function () { return _this.reRender(); }, 1000);
                    }
                    else if (this.counterHandler) {
                        clearTimeout(this.counterHandler);
                        this.counterHandler = undefined;
                    }
                }
                return [2 /*return*/, {
                        counter: counter,
                    }];
            });
        });
    },
    methods: {
        onInput: function (e) {
            var _a;
            var _b = this.resolveInput(e), dataset = _b.dataset, value = _b.value;
            var attr = dataset.attr;
            this.setState((_a = {},
                _a[attr] = value,
                _a));
        },
        sendCaptcha: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mobile, result, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mobile = this.state.mobile;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.sendCaptcha(mobile)];
                        case 2:
                            result = _a.sent();
                            // 显示返回消息
                            this.setMessage({
                                type: 'success',
                                content: result,
                            });
                            this.save(SEND_KEY, Date.now());
                            this.reRender();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_1.message,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        loginByMobile: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var eventLoggedIn, _a, mobile, password, captcha, err_2;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            eventLoggedIn = this.props.eventLoggedIn;
                            _a = this.state, mobile = _a.mobile, password = _a.password, captcha = _a.captcha;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.features.token.loginByMobile(mobile, password, captcha)];
                        case 2:
                            _b.sent();
                            if (eventLoggedIn) {
                                this.pub(eventLoggedIn);
                            }
                            else {
                                this.navigateBack();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_2 = _b.sent();
                            this.setMessage({
                                type: 'error',
                                content: err_2.message,
                            });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    },
});
