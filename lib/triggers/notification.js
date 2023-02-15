"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
var url_1 = require("oak-domain/lib/utils/url");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var sms_1 = require("../utils/sms");
var message_1 = require("./message");
function sendMessage(notification, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data, templateId, channel, messageSystemId, data1, id, _a, messageSystem, _b, system, message, _c, router, userId, type, _d, applications, config, _e, app, config_1, _f, appId, appSecret, instance, page, StateDict, _g, _h, _j, err_1, _k, _l, _m, app, config_2, _o, appId, appSecret, instance, page, _p, openId, wechatMpAppId, _q, _r, _s, err_2, _t, _u, _v, _w, _x, _y, err_3, _z, _0, _1, err2_1, _2, _3, _4;
        var _5, _6, _7, _8, _9, _10, _11;
        return tslib_1.__generator(this, function (_12) {
            switch (_12.label) {
                case 0:
                    data = notification.data, templateId = notification.templateId, channel = notification.channel, messageSystemId = notification.messageSystemId, data1 = notification.data1, id = notification.id;
                    return [4 /*yield*/, context.select('messageSystem', {
                            data: {
                                id: 1,
                                messageId: 1,
                                message: {
                                    id: 1,
                                    userId: 1,
                                    router: 1,
                                    type: 1,
                                },
                                system: {
                                    id: 1,
                                    application$system: {
                                        $entity: 'application',
                                        data: {
                                            id: 1,
                                            type: 1,
                                            config: 1,
                                        },
                                    },
                                }
                            },
                            filter: {
                                id: messageSystemId,
                            }
                        }, { dontCollect: true })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_12.sent(), 1]), messageSystem = _a[0];
                    _b = messageSystem, system = _b.system, message = _b.message;
                    _c = message, router = _c.router, userId = _c.userId, type = _c.type;
                    _d = system, applications = _d.application$system, config = _d.config;
                    _e = channel;
                    switch (_e) {
                        case 'wechatMp': return [3 /*break*/, 2];
                        case 'wechatPublic': return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 18];
                case 2:
                    app = applications.find(function (ele) { return ele.type === 'wechatMp'; });
                    config_1 = app.config;
                    _f = config_1, appId = _f.appId, appSecret = _f.appSecret;
                    instance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    page = "/pages/".concat((0, url_1.composeUrl)(router.pathname, Object.assign({}, router.props, router.state)));
                    StateDict = {
                        'development': 'developer',
                        'staging': 'trial',
                        'production': 'former',
                    };
                    _12.label = 3;
                case 3:
                    _12.trys.push([3, 7, , 10]);
                    return [4 /*yield*/, instance.sendSubscribedMessage({
                            templateId: templateId,
                            data: data,
                            openId: data1.openId,
                            page: page,
                            state: StateDict[process.env.NODE_ENV],
                        })];
                case 4:
                    _12.sent();
                    _h = (_g = context).operate;
                    _j = ['notification'];
                    _5 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 5: return [4 /*yield*/, _h.apply(_g, _j.concat([(_5.id = _12.sent(),
                            _5.action = 'succeed',
                            _5.data = {},
                            _5.filter = {
                                id: id,
                            },
                            _5), { dontCollect: true }]))];
                case 6:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 7:
                    err_1 = _12.sent();
                    console.warn('发微信小程序消息失败', err_1);
                    _l = (_k = context).operate;
                    _m = ['notification'];
                    _6 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 8: return [4 /*yield*/, _l.apply(_k, _m.concat([(_6.id = _12.sent(),
                            _6.action = 'fail',
                            _6.data = {},
                            _6.filter = {
                                id: id,
                            },
                            _6), { dontCollect: true }]))];
                case 9:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 10:
                    app = applications.find(function (ele) { return ele.type === 'wechatPublic'; });
                    config_2 = app.config;
                    _o = config_2, appId = _o.appId, appSecret = _o.appSecret;
                    instance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatPublic', appSecret);
                    page = (0, url_1.composeUrl)(router.pathname, Object.assign({}, router.props, router.state));
                    _p = data1, openId = _p.openId, wechatMpAppId = _p.wechatMpAppId;
                    _12.label = 11;
                case 11:
                    _12.trys.push([11, 15, , 18]);
                    return [4 /*yield*/, instance.sendTemplateMessage({
                            openId: openId,
                            templateId: templateId,
                            url: !wechatMpAppId ? page : undefined,
                            data: data,
                            miniProgram: wechatMpAppId ? {
                                appid: wechatMpAppId,
                                pagepath: "/pages/".concat(page),
                            } : undefined,
                            clientMsgId: id,
                        })];
                case 12:
                    _12.sent();
                    _r = (_q = context).operate;
                    _s = ['notification'];
                    _7 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 13: return [4 /*yield*/, _r.apply(_q, _s.concat([(_7.id = _12.sent(),
                            _7.action = 'succeed',
                            _7.data = {},
                            _7.filter = {
                                id: id,
                            },
                            _7), { dontCollect: true }]))];
                case 14:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 15:
                    err_2 = _12.sent();
                    console.warn('发微信公众号消息失败', err_2);
                    _u = (_t = context).operate;
                    _v = ['notification'];
                    _8 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 16: return [4 /*yield*/, _u.apply(_t, _v.concat([(_8.id = _12.sent(),
                            _8.action = 'fail',
                            _8.data = {},
                            _8.filter = {
                                id: id,
                            },
                            _8), { dontCollect: true }]))];
                case 17:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 18:
                    (0, assert_1.assert)(channel === 'sms');
                    _12.label = 19;
                case 19:
                    _12.trys.push([19, 23, , 32]);
                    return [4 /*yield*/, (0, sms_1.sendSms)({
                            origin: 'ali',
                            templateName: type,
                            templateParamSet: data.params,
                            mobile: data1.mobile,
                        }, context)];
                case 20:
                    _12.sent();
                    _x = (_w = context).operate;
                    _y = ['notification'];
                    _9 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 21: return [4 /*yield*/, _x.apply(_w, _y.concat([(_9.id = _12.sent(),
                            _9.action = 'succeed',
                            _9.data = {},
                            _9.filter = {
                                id: id,
                            },
                            _9), { dontCollect: true }]))];
                case 22:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 23:
                    err_3 = _12.sent();
                    console.warn('发tencent sms消息失败', err_3);
                    _12.label = 24;
                case 24:
                    _12.trys.push([24, 28, , 31]);
                    return [4 /*yield*/, (0, sms_1.sendSms)({
                            origin: 'tencent',
                            templateName: type,
                            templateParamSet: data.paramsArray,
                            mobile: data1.mobile,
                        }, context)];
                case 25:
                    _12.sent();
                    _0 = (_z = context).operate;
                    _1 = ['notification'];
                    _10 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 26: return [4 /*yield*/, _0.apply(_z, _1.concat([(_10.id = _12.sent(),
                            _10.action = 'succeed',
                            _10.data = {},
                            _10.filter = {
                                id: id,
                            },
                            _10), { dontCollect: true }]))];
                case 27:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 28:
                    err2_1 = _12.sent();
                    console.warn('发aliyun sms消息失败', err2_1);
                    _3 = (_2 = context).operate;
                    _4 = ['notification'];
                    _11 = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 29: return [4 /*yield*/, _3.apply(_2, _4.concat([(_11.id = _12.sent(),
                            _11.action = 'fail',
                            _11.data = {},
                            _11.filter = {
                                id: id,
                            },
                            _11), { dontCollect: true }]))];
                case 30:
                    _12.sent();
                    return [2 /*return*/, 1];
                case 31: return [3 /*break*/, 32];
                case 32: return [2 /*return*/];
            }
        });
    });
}
function tryCreateSmsNotification(message, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var smsNotification, messageSystem$message, _a, _b, ms, id, _c, _d, _e, e_1_1;
        var e_1, _f, _g;
        return tslib_1.__generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, (0, message_1.tryMakeSmsNotification)(message, context)];
                case 1:
                    smsNotification = _h.sent();
                    if (!smsNotification) return [3 /*break*/, 11];
                    messageSystem$message = message.messageSystem$message;
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 8, 9, 10]);
                    _a = tslib_1.__values(messageSystem$message), _b = _a.next();
                    _h.label = 3;
                case 3:
                    if (!!_b.done) return [3 /*break*/, 7];
                    ms = _b.value;
                    id = ms.id;
                    _d = (_c = context).operate;
                    _e = ['notification'];
                    _g = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4: return [4 /*yield*/, _d.apply(_c, _e.concat([(_g.id = _h.sent(),
                            _g.action = 'create',
                            _g.data = Object.assign(smsNotification, {
                                messageSystemId: id,
                            }),
                            _g), { dontCollect: true }]))];
                case 5:
                    _h.sent();
                    _h.label = 6;
                case 6:
                    _b = _a.next();
                    return [3 /*break*/, 3];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/, messageSystem$message.length];
                case 11: return [2 /*return*/, 0];
            }
        });
    });
}
var triggers = [
    {
        name: '当创建notification后，业务提交后再进行推送',
        entity: 'notification',
        action: 'create',
        when: 'commit',
        strict: 'takeEasy',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, data_1, data_1_1, d, e_2_1;
                var e_2, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            data = operation.data;
                            if (!(data instanceof Array)) return [3 /*break*/, 9];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, 7, 8]);
                            data_1 = tslib_1.__values(data), data_1_1 = data_1.next();
                            _c.label = 2;
                        case 2:
                            if (!!data_1_1.done) return [3 /*break*/, 5];
                            d = data_1_1.value;
                            return [4 /*yield*/, sendMessage(d, context)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4:
                            data_1_1 = data_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_2_1 = _c.sent();
                            e_2 = { error: e_2_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (data_1_1 && !data_1_1.done && (_b = data_1.return)) _b.call(data_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                            return [7 /*endfinally*/];
                        case 8: return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, sendMessage(data, context)];
                        case 10:
                            _c.sent();
                            _c.label = 11;
                        case 11: return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
    {
        name: '当notification完成时，根据情况去更新message',
        entity: 'notification',
        when: 'after',
        action: ['fail', 'succeed'],
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var filter, _b, message, success, allFailed, smsTried, _c, _d, ms, _e, _f, n, _g, _h, _j, result, _k, _l, _m;
                var e_3, _o, e_4, _p, _q, _r;
                return tslib_1.__generator(this, function (_s) {
                    switch (_s.label) {
                        case 0:
                            filter = operation.filter;
                            (0, assert_1.assert)(filter.id);
                            return [4 /*yield*/, context.select('message', {
                                    data: {
                                        id: 1,
                                        weight: 1,
                                        iState: 1,
                                        type: 1,
                                        entity: 1,
                                        entityId: 1,
                                        userId: 1,
                                        messageSystem$message: {
                                            $entity: 'messageSystem',
                                            data: {
                                                id: 1,
                                                notification$messageSystem: {
                                                    $entity: 'notification',
                                                    data: {
                                                        id: 1,
                                                        iState: 1,
                                                        channel: 1,
                                                    },
                                                },
                                            },
                                        },
                                    }
                                }, { dontCollect: true })];
                        case 1:
                            _b = tslib_1.__read.apply(void 0, [_s.sent(), 1]), message = _b[0];
                            (0, assert_1.assert)(message);
                            if (message.iState === 'success') {
                                return [2 /*return*/, 0];
                            }
                            success = false;
                            allFailed = true;
                            smsTried = false;
                            try {
                                for (_c = tslib_1.__values(message.messageSystem$message), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    ms = _d.value;
                                    try {
                                        for (_e = (e_4 = void 0, tslib_1.__values(ms.notification$messageSystem)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            n = _f.value;
                                            if (n.iState === 'success') {
                                                success = true;
                                                break;
                                            }
                                            if (n.iState !== 'failure') {
                                                allFailed = false;
                                            }
                                            if (n.channel === 'sms') {
                                                smsTried = true;
                                            }
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (_f && !_f.done && (_p = _e.return)) _p.call(_e);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    if (success === true) {
                                        break;
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_o = _c.return)) _o.call(_c);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            if (!success) return [3 /*break*/, 4];
                            _h = (_g = context).operate;
                            _j = ['message'];
                            _q = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 2: 
                        // 有一个完成就算完成
                        return [4 /*yield*/, _h.apply(_g, _j.concat([(_q.id = _s.sent(),
                                    _q.action = 'succeed',
                                    _q.data = {},
                                    _q.filter = {
                                        id: message.id,
                                    },
                                    _q), { dontCollect: true }]))];
                        case 3:
                            // 有一个完成就算完成
                            _s.sent();
                            return [2 /*return*/, 1];
                        case 4:
                            if (!(message.weight === 'medium' && !smsTried && allFailed)) return [3 /*break*/, 6];
                            return [4 /*yield*/, tryCreateSmsNotification(message, context)];
                        case 5:
                            result = _s.sent();
                            return [2 /*return*/, result];
                        case 6:
                            _l = (_k = context).operate;
                            _m = ['message'];
                            _r = {};
                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                        case 7: 
                        // 标识消息发送失败
                        return [4 /*yield*/, _l.apply(_k, _m.concat([(_r.id = _s.sent(),
                                    _r.action = 'fail',
                                    _r.data = {},
                                    _r.filter = {
                                        id: message.id,
                                    },
                                    _r), { dontCollect: true }]))];
                        case 8:
                            // 标识消息发送失败
                            _s.sent();
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    }
];
exports.default = triggers;
