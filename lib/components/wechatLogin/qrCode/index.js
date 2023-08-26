"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Interval = 2 * 60 * 1000;
exports.default = OakComponent({
    isList: false,
    lifetimes: {
        attached: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var type;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    type = this.props.type;
                    this.createWechatLogin();
                    this.createTimer = setInterval(function () {
                        _this.createWechatLogin();
                    }, Interval);
                    this.intervalId = setInterval(function () {
                        _this.getWechatLogin2();
                    }, 1000);
                    return [2 /*return*/];
                });
            });
        },
        detached: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    if (this.createTimer) {
                        clearInterval(this.createTimer);
                    }
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                    return [2 /*return*/];
                });
            });
        },
    },
    data: {
        intervalId: '',
        loading: false,
        successed: false,
    },
    properties: {
        type: 'bind',
        url: '',
    },
    methods: {
        createWechatLogin: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, type, wechatLoginId;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props.type, type = _a === void 0 ? 'bind' : _a;
                            return [4 /*yield*/, this.features.cache.exec('createWechatLogin', {
                                    type: type,
                                    interval: Interval,
                                })];
                        case 1:
                            wechatLoginId = (_b.sent()).result;
                            this.setState({
                                wechatLoginId: wechatLoginId,
                            }, function () {
                                _this.getWechatLogin();
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        getWechatLogin: function () {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var wechatLoginId, _c, wechatLogin, qrCodeUrl, buffer, newBuffer, newBufferToUint16, i, base64Str, binary, bytes, len, i, base64Str;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            wechatLoginId = this.state.wechatLoginId;
                            this.setState({
                                loading: true
                            });
                            return [4 /*yield*/, this.features.cache.refresh('wechatLogin', {
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        type: 1,
                                        qrCodeType: 1,
                                        remark: 1,
                                        expired: 1,
                                        expiresAt: 1,
                                        successed: 1,
                                        wechatQrCode$entity: {
                                            $entity: 'wechatQrCode',
                                            data: {
                                                id: 1,
                                                entity: 1,
                                                entityId: 1,
                                                type: 1,
                                                ticket: 1,
                                                url: 1,
                                                buffer: 1,
                                                expired: 1,
                                                expiresAt: 1,
                                                applicationId: 1,
                                            },
                                            filter: {
                                                entity: 'wechatLogin',
                                            },
                                            indexFrom: 0,
                                            count: 1,
                                        },
                                    },
                                    filter: {
                                        id: wechatLoginId,
                                    },
                                })];
                        case 1:
                            _c = tslib_1.__read.apply(void 0, [(_d.sent()).data, 1]), wechatLogin = _c[0];
                            qrCodeUrl = (_a = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.wechatQrCode$entity[0]) === null || _a === void 0 ? void 0 : _a.url;
                            buffer = (_b = wechatLogin === null || wechatLogin === void 0 ? void 0 : wechatLogin.wechatQrCode$entity[0]) === null || _b === void 0 ? void 0 : _b.buffer;
                            if (buffer) {
                                newBuffer = new ArrayBuffer(buffer.length * 2);
                                newBufferToUint16 = new Uint16Array(newBuffer);
                                for (i = 0; i < buffer.length; i++) {
                                    newBufferToUint16[i] = buffer.charCodeAt(i);
                                }
                                if (process.env.OAK_PLATFORM === 'wechatMp') {
                                    base64Str = wx.arrayBufferToBase64(newBufferToUint16);
                                    qrCodeUrl = 'data:image/png;base64,' + base64Str;
                                }
                                else {
                                    binary = '';
                                    bytes = new Uint8Array(newBufferToUint16);
                                    len = bytes.byteLength;
                                    for (i = 0; i < len; i++) {
                                        binary += String.fromCharCode(bytes[i]);
                                    }
                                    base64Str = window.btoa(binary);
                                    // const buffer2 = Buffer.from(newBufferToUint16, 'base64');
                                    // const base64Str = buffer2.toString('base64');
                                    qrCodeUrl = 'data:image/png;base64,' + base64Str;
                                }
                            }
                            this.setState({
                                qrCodeUrl: qrCodeUrl,
                                loading: false,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        // 每秒调取下面方法，监听用户是否已在微信端授权登录或绑定
        getWechatLogin2: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var wechatLoginId, _a, wechatLogin, successed, type;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            wechatLoginId = this.state.wechatLoginId;
                            return [4 /*yield*/, this.features.cache.refresh('wechatLogin', {
                                    data: {
                                        id: 1,
                                        userId: 1,
                                        type: 1,
                                        qrCodeType: 1,
                                        remark: 1,
                                        expired: 1,
                                        expiresAt: 1,
                                        successed: 1,
                                    },
                                    filter: {
                                        id: wechatLoginId,
                                    },
                                })];
                        case 1:
                            _a = tslib_1.__read.apply(void 0, [(_b.sent()).data, 1]), wechatLogin = _a[0];
                            successed = wechatLogin.successed, type = wechatLogin.type;
                            this.setState({
                                successed: successed,
                                type: type,
                            }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var _a, backUrl, isGoBack;
                                return tslib_1.__generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(successed && type === 'login')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.features.token.loginByWechatInWebEnv(wechatLoginId)];
                                        case 1:
                                            _b.sent();
                                            _a = this.props, url = _a.url;
                                            if (url) {
                                                this.redirectTo({
                                                    url: url,
                                                });
                                                return [2 /*return*/];
                                            }
                                            this.navigateBack();
                                            _b.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
});
