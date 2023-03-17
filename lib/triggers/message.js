"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryMakeSmsNotification = exports.registerMessageNotificationConverters = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var ConverterDict = {};
function registerMessageNotificationConverters(converters) {
    converters.forEach(function (ele) {
        (0, assert_1.assert)(!ConverterDict[ele.type]);
        ConverterDict[ele.type] = ele;
    });
}
exports.registerMessageNotificationConverters = registerMessageNotificationConverters;
var InitialChannalByWeightMatrix = {
    high: ['wechatMp', 'wechatPublic', 'sms'],
    medium: ['wechatMp', 'wechatPublic'],
    low: ['wechatMp', 'wechatPublic'],
};
function tryMakeSmsNotification(message, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var userId, type, entity, entityId, _a, mobile, converter, dispersedData;
        var _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    userId = message.userId, type = message.type, entity = message.entity, entityId = message.entityId;
                    return [4 /*yield*/, context.select('mobile', {
                            data: {
                                id: 1,
                                mobile: 1,
                            },
                            filter: {
                                userId: userId,
                            },
                            indexFrom: 0,
                            count: 1,
                        }, { dontCollect: true })];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 1]), mobile = _a[0];
                    if (!mobile) return [3 /*break*/, 4];
                    converter = ConverterDict[type] && ConverterDict[type].toSms;
                    if (!converter) return [3 /*break*/, 4];
                    return [4 /*yield*/, converter(entity, entityId, context)];
                case 2:
                    dispersedData = _c.sent();
                    if (!dispersedData) return [3 /*break*/, 4];
                    _b = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 3: return [2 /*return*/, (_b.id = _c.sent(),
                        _b.data = dispersedData,
                        _b.channel = 'sms',
                        _b.data1 = {
                            mobile: mobile,
                        },
                        _b)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.tryMakeSmsNotification = tryMakeSmsNotification;
function createNotification(message, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var restriction, userId, weight, type, entity, entityId, application, platformId, userSystems, systems, messageTypeTemplateIds, channels, messageSentCount, messageSystemDatas, _a;
        var _b;
        var _this = this;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    restriction = message.restriction, userId = message.userId, weight = message.weight, type = message.type, entity = message.entity, entityId = message.entityId;
                    (0, assert_1.assert)(userId);
                    application = context.getApplication();
                    platformId = application.system.platformId;
                    return [4 /*yield*/, context.select('userSystem', {
                            data: {
                                id: 1,
                                system: {
                                    id: 1,
                                    config: 1,
                                    application$system: {
                                        $entity: 'application',
                                        data: {
                                            id: 1,
                                            type: 1,
                                            config: 1,
                                        },
                                    },
                                },
                            },
                            filter: {
                                userId: userId,
                                system: {
                                    platformId: platformId,
                                }
                            },
                        }, { dontCollect: true })];
                case 1:
                    userSystems = _c.sent();
                    systems = (0, lodash_1.uniqBy)(userSystems.map(function (ele) { return ele.system; }).filter(function (ele) {
                        if (restriction && restriction.systemIds) {
                            return restriction.systemIds.includes(ele.id);
                        }
                        return true;
                    }), 'id');
                    if (systems.length === 0) {
                        console.warn("\u7C7B\u578B\u4E3A".concat(type, "\u7684\u6D88\u606F\u5728\u751F\u6210\u65F6\uFF0C\u5C1D\u8BD5\u4E3A\u4E4B\u751F\u6210\u901A\u77E5\uFF0C\u627E\u4E0D\u5230\u53EF\u63A8\u9001\u7684system"));
                        return [2 /*return*/, 0];
                    }
                    return [4 /*yield*/, context.select('messageTypeTemplateId', {
                            data: {
                                id: 1,
                                templateId: 1,
                                applicationId: 1,
                                type: 1,
                            },
                            filter: {
                                type: type,
                                application: {
                                    systemId: {
                                        $in: systems.map(function (ele) { return ele.id; }),
                                    },
                                },
                            },
                        }, { dontCollect: true })];
                case 2:
                    messageTypeTemplateIds = _c.sent();
                    channels = InitialChannalByWeightMatrix[weight].filter(function (ele) {
                        if (restriction && restriction.channels) {
                            return restriction.channels.includes(ele);
                        }
                        return true;
                    });
                    messageSentCount = 0;
                    messageSystemDatas = [];
                    return [4 /*yield*/, Promise.all(systems.map(function (system) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var applications, config, notificationDatas, smsNotification, messageSystemData, _a;
                            var _b, _c;
                            var _this = this;
                            return tslib_1.__generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        applications = system.application$system, config = system.config;
                                        notificationDatas = [];
                                        return [4 /*yield*/, Promise.all(channels.map(function (channel) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var _a, apps, wechatUsers, _loop_1, apps_1, apps_1_1, app, e_1_1, apps, wechatUsers, _loop_2, apps_2, apps_2_1, app, e_2_1;
                                                var e_1, _b, e_2, _c;
                                                return tslib_1.__generator(this, function (_d) {
                                                    switch (_d.label) {
                                                        case 0:
                                                            _a = channel;
                                                            switch (_a) {
                                                                case 'wechatMp': return [3 /*break*/, 1];
                                                                case 'wechatPublic': return [3 /*break*/, 11];
                                                            }
                                                            return [3 /*break*/, 21];
                                                        case 1:
                                                            apps = applications.filter(function (ele) { return ele.type === 'wechatMp'; });
                                                            return [4 /*yield*/, context.select('wechatUser', {
                                                                    data: {
                                                                        id: 1,
                                                                        applicationId: 1,
                                                                        openId: 1,
                                                                    },
                                                                    filter: {
                                                                        applicationId: {
                                                                            $in: apps.map(function (ele) { return ele.id; }),
                                                                        },
                                                                        userId: userId,
                                                                    }
                                                                }, { dontCollect: true })];
                                                        case 2:
                                                            wechatUsers = _d.sent();
                                                            _loop_1 = function (app) {
                                                                var wechatUser, messageTypeTemplateId, converter, dispersedData, _e, _f, _g;
                                                                var _h;
                                                                return tslib_1.__generator(this, function (_j) {
                                                                    switch (_j.label) {
                                                                        case 0:
                                                                            wechatUser = wechatUsers.find(function (ele) { return ele.applicationId === app.id; });
                                                                            messageTypeTemplateId = messageTypeTemplateIds.find(function (ele) { return ele.applicationId === app.id && ele.type === type; });
                                                                            if (!(messageTypeTemplateId && wechatUser)) return [3 /*break*/, 4];
                                                                            converter = ConverterDict[type] && ConverterDict[type].toWechatMp;
                                                                            _e = converter;
                                                                            if (!_e) return [3 /*break*/, 2];
                                                                            return [4 /*yield*/, converter(entity, entityId, apps, app, context)];
                                                                        case 1:
                                                                            _e = (_j.sent());
                                                                            _j.label = 2;
                                                                        case 2:
                                                                            dispersedData = _e;
                                                                            if (!dispersedData) return [3 /*break*/, 4];
                                                                            _g = (_f = notificationDatas).push;
                                                                            _h = {};
                                                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                                                        case 3:
                                                                            _g.apply(_f, [(_h.id = _j.sent(),
                                                                                    _h.data = dispersedData,
                                                                                    _h.channel = channel,
                                                                                    _h.applicationId = app.id,
                                                                                    _h.templateId = messageTypeTemplateId.templateId,
                                                                                    _h.data1 = {
                                                                                        openId: wechatUser.openId,
                                                                                    },
                                                                                    _h)]);
                                                                            _j.label = 4;
                                                                        case 4: return [2 /*return*/];
                                                                    }
                                                                });
                                                            };
                                                            _d.label = 3;
                                                        case 3:
                                                            _d.trys.push([3, 8, 9, 10]);
                                                            apps_1 = tslib_1.__values(apps), apps_1_1 = apps_1.next();
                                                            _d.label = 4;
                                                        case 4:
                                                            if (!!apps_1_1.done) return [3 /*break*/, 7];
                                                            app = apps_1_1.value;
                                                            return [5 /*yield**/, _loop_1(app)];
                                                        case 5:
                                                            _d.sent();
                                                            _d.label = 6;
                                                        case 6:
                                                            apps_1_1 = apps_1.next();
                                                            return [3 /*break*/, 4];
                                                        case 7: return [3 /*break*/, 10];
                                                        case 8:
                                                            e_1_1 = _d.sent();
                                                            e_1 = { error: e_1_1 };
                                                            return [3 /*break*/, 10];
                                                        case 9:
                                                            try {
                                                                if (apps_1_1 && !apps_1_1.done && (_b = apps_1.return)) _b.call(apps_1);
                                                            }
                                                            finally { if (e_1) throw e_1.error; }
                                                            return [7 /*endfinally*/];
                                                        case 10: return [3 /*break*/, 22];
                                                        case 11:
                                                            apps = applications.filter(function (ele) { return ele.type === 'wechatPublic'; });
                                                            return [4 /*yield*/, context.select('wechatUser', {
                                                                    data: {
                                                                        id: 1,
                                                                        applicationId: 1,
                                                                        openId: 1,
                                                                    },
                                                                    filter: {
                                                                        applicationId: {
                                                                            $in: apps.map(function (ele) { return ele.id; }),
                                                                        },
                                                                        userId: userId,
                                                                    }
                                                                }, { dontCollect: true })];
                                                        case 12:
                                                            wechatUsers = _d.sent();
                                                            _loop_2 = function (app) {
                                                                var wechatUser, messageTypeTemplateId, converter, disperseResult, _k, data, wechatMpAppId, _l, _m;
                                                                var _o;
                                                                return tslib_1.__generator(this, function (_p) {
                                                                    switch (_p.label) {
                                                                        case 0:
                                                                            wechatUser = wechatUsers.find(function (ele) { return ele.applicationId === app.id; });
                                                                            messageTypeTemplateId = messageTypeTemplateIds.find(function (ele) { return ele.applicationId === app.id && ele.type === type; });
                                                                            if (!(messageTypeTemplateId && wechatUser)) return [3 /*break*/, 4];
                                                                            converter = ConverterDict[type] && ConverterDict[type].toWechatPublic;
                                                                            _k = converter;
                                                                            if (!_k) return [3 /*break*/, 2];
                                                                            return [4 /*yield*/, converter(entity, entityId, apps, app, context)];
                                                                        case 1:
                                                                            _k = (_p.sent());
                                                                            _p.label = 2;
                                                                        case 2:
                                                                            disperseResult = _k;
                                                                            if (!disperseResult) return [3 /*break*/, 4];
                                                                            data = disperseResult.data, wechatMpAppId = disperseResult.wechatMpAppId;
                                                                            _m = (_l = notificationDatas).push;
                                                                            _o = {};
                                                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                                                        case 3:
                                                                            _m.apply(_l, [(_o.id = _p.sent(),
                                                                                    _o.data = data,
                                                                                    _o.channel = channel,
                                                                                    _o.applicationId = app.id,
                                                                                    _o.templateId = messageTypeTemplateId.templateId,
                                                                                    _o.data1 = {
                                                                                        openId: wechatUser.openId,
                                                                                        wechatMpAppId: wechatMpAppId,
                                                                                    },
                                                                                    _o)]);
                                                                            _p.label = 4;
                                                                        case 4: return [2 /*return*/];
                                                                    }
                                                                });
                                                            };
                                                            _d.label = 13;
                                                        case 13:
                                                            _d.trys.push([13, 18, 19, 20]);
                                                            apps_2 = tslib_1.__values(apps), apps_2_1 = apps_2.next();
                                                            _d.label = 14;
                                                        case 14:
                                                            if (!!apps_2_1.done) return [3 /*break*/, 17];
                                                            app = apps_2_1.value;
                                                            return [5 /*yield**/, _loop_2(app)];
                                                        case 15:
                                                            _d.sent();
                                                            _d.label = 16;
                                                        case 16:
                                                            apps_2_1 = apps_2.next();
                                                            return [3 /*break*/, 14];
                                                        case 17: return [3 /*break*/, 20];
                                                        case 18:
                                                            e_2_1 = _d.sent();
                                                            e_2 = { error: e_2_1 };
                                                            return [3 /*break*/, 20];
                                                        case 19:
                                                            try {
                                                                if (apps_2_1 && !apps_2_1.done && (_c = apps_2.return)) _c.call(apps_2);
                                                            }
                                                            finally { if (e_2) throw e_2.error; }
                                                            return [7 /*endfinally*/];
                                                        case 20: return [3 /*break*/, 22];
                                                        case 21:
                                                            {
                                                                (0, assert_1.assert)(channel === 'sms'); // 目前只支持三种
                                                                return [3 /*break*/, 22];
                                                            }
                                                            _d.label = 22;
                                                        case 22: return [2 /*return*/];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _d.sent();
                                        if (!channels.includes('sms')) return [3 /*break*/, 3];
                                        return [4 /*yield*/, tryMakeSmsNotification(message, context)];
                                    case 2:
                                        smsNotification = _d.sent();
                                        if (smsNotification) {
                                            notificationDatas.push(smsNotification);
                                        }
                                        _d.label = 3;
                                    case 3:
                                        _b = {};
                                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                    case 4:
                                        messageSystemData = (_b.id = _d.sent(),
                                            _b.messageId = message.id,
                                            _b.systemId = system.id,
                                            _b);
                                        if (!(notificationDatas.length > 0)) return [3 /*break*/, 6];
                                        messageSentCount += notificationDatas.length;
                                        _a = messageSystemData;
                                        _c = {};
                                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                    case 5:
                                        _a.notification$messageSystem = (_c.id = _d.sent(),
                                            _c.action = 'create',
                                            _c.data = notificationDatas,
                                            _c);
                                        _d.label = 6;
                                    case 6:
                                        messageSystemDatas.push(messageSystemData);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    _c.sent();
                    if (!(messageSystemDatas.length > 0)) return [3 /*break*/, 5];
                    _a = message;
                    _b = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 4:
                    _a.messageSystem$message = (_b.id = _c.sent(),
                        _b.action = 'create',
                        _b.data = messageSystemDatas,
                        _b);
                    _c.label = 5;
                case 5:
                    message.iState = messageSentCount ? 'sending' : 'failure';
                    return [2 /*return*/, messageSentCount];
            }
        });
    });
}
var triggers = [
    {
        name: '当创建message时，创建相应的通知数据',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, count, data_1, data_1_1, d, _b, e_3_1;
                var e_3, _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            data = operation.data;
                            count = 0;
                            if (!(data instanceof Array)) return [3 /*break*/, 9];
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 6, 7, 8]);
                            data_1 = tslib_1.__values(data), data_1_1 = data_1.next();
                            _d.label = 2;
                        case 2:
                            if (!!data_1_1.done) return [3 /*break*/, 5];
                            d = data_1_1.value;
                            _b = count;
                            return [4 /*yield*/, createNotification(d, context)];
                        case 3:
                            count = _b + _d.sent();
                            _d.label = 4;
                        case 4:
                            data_1_1 = data_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_3_1 = _d.sent();
                            e_3 = { error: e_3_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (data_1_1 && !data_1_1.done && (_c = data_1.return)) _c.call(data_1);
                            }
                            finally { if (e_3) throw e_3.error; }
                            return [7 /*endfinally*/];
                        case 8: return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, createNotification(data, context)];
                        case 10:
                            count = _d.sent();
                            _d.label = 11;
                        case 11: return [2 /*return*/, count];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
