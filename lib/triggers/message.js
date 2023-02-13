"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMessageNotificationConverters = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var ConverterDict = {};
function registerMessageNotificationConverters(converters) {
    converters.forEach(function (ele) {
        (0, assert_1.assert)(!ConverterDict[ele.type]);
        ConverterDict[ele.type] = ele;
    });
}
exports.registerMessageNotificationConverters = registerMessageNotificationConverters;
var InitialChannalByWeightMatrix = {
    high: ['mp', 'wechatPublic', 'sms'],
    medium: ['mp', 'wechatPublic'],
    low: ['mp', 'wechatPublic'],
};
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
                    systems = userSystems.map(function (ele) { return ele.system; }).filter(function (ele) {
                        if (restriction && restriction.systemIds) {
                            return restriction.systemIds.includes(ele.id);
                        }
                        return true;
                    });
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
                    if (channels.length === 0) {
                        console.warn("\u7C7B\u578B\u4E3A".concat(type, "\u7684\u6D88\u606F\u5728\u751F\u6210\u65F6\uFF0C\u5C1D\u8BD5\u4E3A\u4E4B\u751F\u6210\u901A\u77E5\uFF0C\u627E\u4E0D\u5230\u53EF\u63A8\u9001\u7684channel"));
                        return [2 /*return*/, 0];
                    }
                    messageSentCount = 0;
                    messageSystemDatas = [];
                    return [4 /*yield*/, Promise.all(systems.map(function (system) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var applications, config, notificationDatas, converter, dispersedData, _a, _b, messageSystemData, _c;
                            var _d, _e, _f;
                            var _this = this;
                            return tslib_1.__generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        applications = system.application$system, config = system.config;
                                        notificationDatas = [];
                                        return [4 /*yield*/, Promise.all(channels.map(function (channel) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                var _a, app_1, messageTypeTemplateId, converter, dispersedData, _b, _c, _d, app_2, messageTypeTemplateId, converter, dispersedData, _e, _f, _g;
                                                var _h, _j;
                                                return tslib_1.__generator(this, function (_k) {
                                                    switch (_k.label) {
                                                        case 0:
                                                            _a = channel;
                                                            switch (_a) {
                                                                case 'mp': return [3 /*break*/, 1];
                                                                case 'wechatPublic': return [3 /*break*/, 6];
                                                            }
                                                            return [3 /*break*/, 11];
                                                        case 1:
                                                            app_1 = applications === null || applications === void 0 ? void 0 : applications.find(function (ele) { return ele.type === 'wechatMp'; });
                                                            if (!app_1) return [3 /*break*/, 5];
                                                            messageTypeTemplateId = messageTypeTemplateIds.find(function (ele) { return ele.applicationId === app_1.id && ele.type === type; });
                                                            if (!messageTypeTemplateId) return [3 /*break*/, 5];
                                                            converter = ConverterDict[type] && ConverterDict[type].toWechatMp;
                                                            _b = converter;
                                                            if (!_b) return [3 /*break*/, 3];
                                                            return [4 /*yield*/, converter(entity, entityId, context)];
                                                        case 2:
                                                            _b = (_k.sent());
                                                            _k.label = 3;
                                                        case 3:
                                                            dispersedData = _b;
                                                            if (!dispersedData) return [3 /*break*/, 5];
                                                            _d = (_c = notificationDatas).push;
                                                            _h = {};
                                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                                        case 4:
                                                            _d.apply(_c, [(_h.id = _k.sent(),
                                                                    _h.data = dispersedData,
                                                                    _h.channel = channel,
                                                                    _h.applicationId = app_1.id,
                                                                    _h.templateId = messageTypeTemplateId.templateId,
                                                                    _h)]);
                                                            _k.label = 5;
                                                        case 5: return [3 /*break*/, 12];
                                                        case 6:
                                                            app_2 = applications === null || applications === void 0 ? void 0 : applications.find(function (ele) { return ele.type === 'wechatPublic'; });
                                                            if (!app_2) return [3 /*break*/, 10];
                                                            messageTypeTemplateId = messageTypeTemplateIds.find(function (ele) { return ele.applicationId === app_2.id && ele.type === type; });
                                                            if (!messageTypeTemplateId) return [3 /*break*/, 10];
                                                            converter = ConverterDict[type] && ConverterDict[type].toWechatPublic;
                                                            _e = converter;
                                                            if (!_e) return [3 /*break*/, 8];
                                                            return [4 /*yield*/, converter(entity, entityId, context)];
                                                        case 7:
                                                            _e = (_k.sent());
                                                            _k.label = 8;
                                                        case 8:
                                                            dispersedData = _e;
                                                            if (!dispersedData) return [3 /*break*/, 10];
                                                            _g = (_f = notificationDatas).push;
                                                            _j = {};
                                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                                        case 9:
                                                            _g.apply(_f, [(_j.id = _k.sent(),
                                                                    _j.data = dispersedData,
                                                                    _j.channel = channel,
                                                                    _j.applicationId = app_2.id,
                                                                    _j.templateId = messageTypeTemplateId.templateId,
                                                                    _j)]);
                                                            _k.label = 10;
                                                        case 10: return [3 /*break*/, 12];
                                                        case 11:
                                                            {
                                                                (0, assert_1.assert)(channel === 'sms'); // 目前只支持三种
                                                                return [3 /*break*/, 12];
                                                            }
                                                            _k.label = 12;
                                                        case 12: return [2 /*return*/];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _g.sent();
                                        if (!channels.includes('sms')) return [3 /*break*/, 4];
                                        converter = ConverterDict[type] && ConverterDict[type].toSms;
                                        if (!converter) return [3 /*break*/, 4];
                                        return [4 /*yield*/, converter(entity, entityId, context)];
                                    case 2:
                                        dispersedData = _g.sent();
                                        if (!dispersedData) return [3 /*break*/, 4];
                                        _b = (_a = notificationDatas).push;
                                        _d = {};
                                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                    case 3:
                                        _b.apply(_a, [(_d.id = _g.sent(),
                                                _d.data = dispersedData,
                                                _d.channel = 'sms',
                                                _d)]);
                                        _g.label = 4;
                                    case 4:
                                        _e = {};
                                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                    case 5:
                                        messageSystemData = (_e.id = _g.sent(),
                                            _e.messageId = message.id,
                                            _e.systemId = system.id,
                                            _e);
                                        if (!(notificationDatas.length > 0)) return [3 /*break*/, 7];
                                        messageSentCount += notificationDatas.length;
                                        _c = messageSystemData;
                                        _f = {};
                                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                    case 6:
                                        _c.notification$messageSystem = (_f.id = _g.sent(),
                                            _f.action = 'create',
                                            _f.data = notificationDatas,
                                            _f);
                                        messageSystemDatas.push(messageSystemData);
                                        _g.label = 7;
                                    case 7: return [2 /*return*/];
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
                    message.iState = messageSentCount ? 'sending' : 'failed';
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
                var data, count, data_1, data_1_1, d, _b, e_1_1;
                var e_1, _c;
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
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (data_1_1 && !data_1_1.done && (_c = data_1.return)) _c.call(data_1);
                            }
                            finally { if (e_1) throw e_1.error; }
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
