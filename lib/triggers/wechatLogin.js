"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var triggers = [
    {
        name: '当创建wechatLogin时，尝试为之创建一个wechatQrCode',
        entity: 'wechatLogin',
        action: 'create',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, fn;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            fn = function (wechatLoginData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var id, _a, _b, _c;
                                var _d, _e;
                                return tslib_1.__generator(this, function (_f) {
                                    switch (_f.label) {
                                        case 0:
                                            id = wechatLoginData.id;
                                            Object.assign(wechatLoginData, {
                                                expired: false,
                                                successed: false,
                                            });
                                            if (!wechatLoginData.expiresAt) {
                                                Object.assign(wechatLoginData, {
                                                    expiresAt: Date.now() + 2 * 60 * 1000,
                                                });
                                            }
                                            _b = (_a = context).operate;
                                            _c = ['wechatQrCode'];
                                            _d = {};
                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                        case 1:
                                            _d.id = _f.sent(),
                                                _d.action = 'create';
                                            _e = {};
                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                        case 2: 
                                        // 为之创建微信体系下的一个weChatQrCode
                                        return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.data = (_e.id = _f.sent(),
                                                    _e.entity = 'wechatLogin',
                                                    _e.entityId = id,
                                                    _e.props = {
                                                        pathname: '/wechatLogin/confirm',
                                                        props: {
                                                            oakId: id,
                                                        },
                                                    },
                                                    _e.type = wechatLoginData.qrCodeType,
                                                    _e),
                                                    _d), {}]))];
                                        case 3:
                                            // 为之创建微信体系下的一个weChatQrCode
                                            _f.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!(data instanceof Array)) return [3 /*break*/, 1];
                            (0, assert_1.assert)('授权不存在一对多的情况');
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, fn(data)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, 0];
                    }
                });
            });
        },
    },
    {
        name: '当wechatLogin过期时，使其相关的wechatQrCode也过期',
        entity: 'wechatLogin',
        action: 'update',
        check: function (operation) {
            var data = operation.data;
            return !!data.expired;
        },
        when: 'before',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, _b;
                var _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            data = operation.data;
                            _b = data;
                            _c = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 1:
                            _b.wechatQrCode$entity = (_c.id = _d.sent(),
                                _c.action = 'update',
                                _c.data = {
                                    expired: true,
                                },
                                _c);
                            return [2 /*return*/, 1];
                    }
                });
            });
        },
    },
];
exports.default = triggers;
