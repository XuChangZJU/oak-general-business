"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMessagePropsConverter = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = require("oak-domain/lib/utils/assert");
var SmsCoverter;
var WechatPublicConverter;
var WechatMpConverter;
function registerMessagePropsConverter(converter) {
    var sms = converter.sms, wechatPublic = converter.wechatPublic, wechatMp = converter.wechatMp;
    SmsCoverter = sms;
    WechatPublicConverter = wechatPublic;
    WechatMpConverter = wechatMp;
}
exports.registerMessagePropsConverter = registerMessagePropsConverter;
var InitialChannalByWeightMatrix = {
    high: ['mp', 'wechatPublic', 'sms'],
    medium: ['mp', 'wechatPublic'],
    low: ['mp', 'wechatPublic'],
};
function assignMessageSystemAndSent(message, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var restriction, userId, weight, type, props, application, platformId, userSystems, systems, channels, messageSentCount, messageSystemDatas, _a;
        var _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    restriction = message.restriction, userId = message.userId, weight = message.weight, type = message.type, props = message.props;
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
                    channels = InitialChannalByWeightMatrix[weight].filter(function (ele) {
                        if (restriction && restriction.channels) {
                            return restriction.channels.includes(ele);
                        }
                        return true;
                    });
                    messageSentCount = 0;
                    messageSystemDatas = [];
                    systems.forEach(function (system) {
                        var applications = system.application$system, config = system.config;
                        var messageSentDatas = [];
                        channels.forEach(function (channel) {
                            switch (channel) {
                                case 'mp': {
                                    var app = applications === null || applications === void 0 ? void 0 : applications.find(function (ele) { return ele.type === 'wechatMp'; });
                                    if (app) {
                                        var dispersedData = WechatMpConverter && WechatMpConverter(type, props, app.id);
                                        if (dispersedData) {
                                            messageSentDatas.push({
                                                id: (0, uuid_1.generateNewId)(),
                                                data: dispersedData,
                                                channel: channel,
                                                applicationId: app.id,
                                            });
                                        }
                                    }
                                    break;
                                }
                                case 'wechatPublic': {
                                    var app = applications === null || applications === void 0 ? void 0 : applications.find(function (ele) { return ele.type === 'wechatPublic'; });
                                    if (app) {
                                        var id = app.id, config_1 = app.config;
                                        var dispersedData = WechatPublicConverter && WechatPublicConverter(type, props, app.id);
                                        if (dispersedData) {
                                            messageSentDatas.push({
                                                id: (0, uuid_1.generateNewId)(),
                                                data: dispersedData,
                                                channel: channel,
                                                applicationId: app.id,
                                            });
                                        }
                                    }
                                    break;
                                }
                                default: {
                                    (0, assert_1.assert)(channel === 'sms'); // 目前只支持三种
                                    break;
                                }
                            }
                        });
                        if (channels.includes('sms')) {
                            var dispersedData = SmsCoverter && SmsCoverter(type, props, system.id);
                            if (dispersedData) {
                                messageSentDatas.push({
                                    id: (0, uuid_1.generateNewId)(),
                                    data: dispersedData,
                                    channel: 'sms',
                                });
                            }
                        }
                        var messageSystemData = {
                            id: (0, uuid_1.generateNewId)(),
                            messageId: message.id,
                            systemId: system.id,
                        };
                        if (messageSentDatas.length > 0) {
                            messageSentCount += messageSentDatas.length;
                            messageSystemData.messageSent$messageSystem = {
                                id: (0, uuid_1.generateNewId)(),
                                action: 'create',
                                data: messageSentDatas,
                            };
                        }
                        messageSystemDatas.push(messageSystemData);
                    });
                    if (!(messageSystemDatas.length > 0)) return [3 /*break*/, 3];
                    _a = message;
                    _b = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 2:
                    _a.messageSystem$message = (_b.id = _c.sent(),
                        _b.action = 'create',
                        _b.data = messageSystemDatas,
                        _b);
                    _c.label = 3;
                case 3:
                    message.iState = messageSentCount ? 'sending' : 'failed';
                    return [2 /*return*/, messageSentCount];
            }
        });
    });
}
var triggers = [
    {
        name: '当创建message时，创建相应的messageSystem和messageSent',
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
                            return [4 /*yield*/, assignMessageSystemAndSent(d, context)];
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
                        case 9: return [4 /*yield*/, assignMessageSystemAndSent(data, context)];
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
