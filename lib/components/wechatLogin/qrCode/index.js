"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var Interval = 2 * 60 * 1000;
exports.default = OakComponent({
    isList: false,
    lifetimes: {
        attached: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    this.createWechatLogin();
                    this.createTimer = setInterval(function () {
                        _this.createWechatLogin();
                    }, Interval);
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
                    return [2 /*return*/];
                });
            });
        },
    },
    data: {
        loading: false,
    },
    properties: {
        type: 'bind',
    },
    methods: {
        createWechatLogin: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var userId, wechatLoginId, _a, type, _b, _c, _d;
                var _e;
                var _this = this;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            userId = this.features.token.getUserId();
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1:
                            wechatLoginId = _f.sent();
                            _a = this.props.type, type = _a === void 0 ? 'bind' : _a;
                            _c = (_b = this.features.cache).operate;
                            _d = ['wechatLogin'];
                            _e = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                                    _e.action = 'create',
                                    _e.data = {
                                        id: wechatLoginId,
                                        userId: userId,
                                        type: type,
                                        expiresAt: Date.now() + Interval,
                                        expired: false,
                                        qrCodeType: 'wechatPublic',
                                        successed: false,
                                    },
                                    _e)]))];
                        case 3:
                            _f.sent();
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
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
