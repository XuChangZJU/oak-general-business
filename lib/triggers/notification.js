"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var oak_external_sdk_1 = require("oak-external-sdk");
function sendMessage(notification, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var data, templateId, channel, messageSystemId, _a, messageSystem, system, applications, _b, app, config, _c, appId, appSecret, instance;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    data = notification.data, templateId = notification.templateId, channel = notification.channel, messageSystemId = notification.messageSystemId;
                    return [4 /*yield*/, context.select('messageSystem', {
                            data: {
                                id: 1,
                                messageId: 1,
                                message: {
                                    id: 1,
                                    userId: 1,
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
                    _a = tslib_1.__read.apply(void 0, [_d.sent(), 1]), messageSystem = _a[0];
                    system = messageSystem.system;
                    applications = system.application$system;
                    _b = channel;
                    switch (_b) {
                        case 'mp': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 2:
                    app = applications.find(function (ele) { return ele.type === 'wechatMp'; });
                    config = app.config;
                    _c = config, appId = _c.appId, appSecret = _c.appSecret;
                    instance = oak_external_sdk_1.WechatSDK.getInstance(appId, 'wechatMp', appSecret);
                    return [4 /*yield*/, instance.sendSubscribedMessage({
                            templateId: templateId,
                            data: data,
                        })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4: return [2 /*return*/];
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
        strict: 'makeSure',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, data_1, data_1_1, d, e_1_1;
                var e_1, _b;
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
                            e_1_1 = _c.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (data_1_1 && !data_1_1.done && (_b = data_1.return)) _b.call(data_1);
                            }
                            finally { if (e_1) throw e_1.error; }
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
];
exports.default = triggers;
