"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageSent = exports.registerMessagePropsConverter = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var SmsCoverter;
var WechatConverter;
function registerMessagePropsConverter(converter) {
    var sms = converter.sms, wechat = converter.wechat;
    SmsCoverter = sms;
    WechatConverter = wechat;
}
exports.registerMessagePropsConverter = registerMessagePropsConverter;
function tryAddMessageSent(message, channel, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var systemId, props, type, _a, application, config2, appId, dispersedData, _b, _c, _d;
        var _e;
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!WechatConverter) {
                        return [2 /*return*/, 0];
                    }
                    systemId = message.systemId, props = message.props, type = message.type;
                    return [4 /*yield*/, context.select('application', {
                            data: {
                                id: 1,
                                name: 1,
                                config: 1,
                                type: 1,
                                systemId: 1,
                                style: 1,
                            },
                            filter: {
                                type: 'wechatPublic',
                                systemId: systemId,
                            },
                        }, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_f.sent(), 1]), application = _a[0];
                    config2 = application.config;
                    appId = config2.appId;
                    switch (channel) {
                        case 'weChat': {
                            dispersedData = WechatConverter(type, props, appId);
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    if (!dispersedData) {
                        return [2 /*return*/, 0];
                    }
                    _c = (_b = context).operate;
                    _d = ['messageSent'];
                    _e = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                            _e.action = 'create',
                            _e.data = {
                                messageId: message.id,
                                data: dispersedData,
                                channel: channel,
                            },
                            _e), {}]))];
                case 3:
                    _f.sent();
                    return [2 /*return*/, 1];
            }
        });
    });
}
function addMessageSent(message, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var weight, _a, result, count, result, count2, result;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    weight = message.weight;
                    _a = weight;
                    switch (_a) {
                        case 'high': return [3 /*break*/, 1];
                        case 'medium': return [3 /*break*/, 3];
                        case 'low': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 1: return [4 /*yield*/, Promise.all([
                        tryAddMessageSent(message, 'wechat', context),
                        tryAddMessageSent(message, 'sms', context),
                    ])];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, result.reduce(function (a, b) { return a || b; })];
                case 3: return [4 /*yield*/, context.count('messageSent', {
                        filter: {
                            messageId: message.id,
                        },
                    }, {})];
                case 4:
                    count = _b.sent();
                    if (!(count < 1)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Promise.all([
                            tryAddMessageSent(message, 'wechat', context),
                        ])];
                case 5:
                    result = _b.sent();
                    count2 = result.reduce(function (a, b) { return a || b; });
                    if (count2 > 0) {
                        return [2 /*return*/, count2];
                    }
                    return [4 /*yield*/, tryAddMessageSent(message, 'sms', context)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [4 /*yield*/, tryAddMessageSent(message, 'sms', context)];
                case 8: return [2 /*return*/, _b.sent()];
                case 9: return [4 /*yield*/, Promise.all([
                        tryAddMessageSent(message, 'wechat', context),
                    ])];
                case 10:
                    result = _b.sent();
                    return [2 /*return*/, result.reduce(function (a, b) { return a || b; })];
                case 11:
                    {
                        (0, assert_1.assert)(false);
                    }
                    _b.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.addMessageSent = addMessageSent;
var triggers = [
    {
        name: '当创建message时，创建相应的messageSent',
        entity: 'message',
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
                            fn = function (messageData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var result;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, addMessageSent(messageData, context)];
                                        case 1:
                                            result = _a.sent();
                                            if (result === 0) {
                                                Object.assign(messageData, {
                                                    iState: 'fail',
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!(data instanceof Array)) return [3 /*break*/, 1];
                            (0, assert_1.assert)('不存在一对多的情况');
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, fn(data)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
