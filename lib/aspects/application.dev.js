"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var DEV_CONFIG_1 = require("../data/DEV-CONFIG");
function getApplication(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, APP_ID, appId, _a, application, _b, application2;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    type = params.type;
                    APP_ID = {
                        web: DEV_CONFIG_1.DEV_WEB_APPLICATION_ID,
                        wechatMp: DEV_CONFIG_1.DEV_WECHATMP_APPLICATION_ID,
                        wechatPublic: DEV_CONFIG_1.DEV_WECHATPUPLIC_APPLICATION_ID,
                    };
                    appId = APP_ID[type];
                    return [4 /*yield*/, context.select('application', {
                            data: {
                                id: 1,
                                name: 1,
                                config: 1,
                                type: 1,
                                systemId: 1,
                                system: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                    type: 1,
                                    systemId: 1,
                                    system: {
                                        id: 1,
                                        name: 1,
                                        config: 1,
                                    },
                                },
                            },
                            filter: {
                                id: appId,
                            },
                        }, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application = _a[0];
                    if (!(type === 'wechatMp')) return [3 /*break*/, 2];
                    (0, assert_1.default)(application, '微信小程序环境下 application必须存在小程序相关配置');
                    return [3 /*break*/, 6];
                case 2:
                    if (!(type === 'wechatPublic')) return [3 /*break*/, 5];
                    if (!!application) return [3 /*break*/, 4];
                    return [4 /*yield*/, context.select('application', {
                            data: {
                                id: 1,
                                name: 1,
                                config: 1,
                                type: 1,
                                systemId: 1,
                                system: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                },
                            },
                            filter: {
                                id: APP_ID.web,
                            },
                        }, {})];
                case 3:
                    _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application2 = _b[0];
                    (0, assert_1.default)(application2, '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置');
                    return [2 /*return*/, application2.id];
                case 4: return [3 /*break*/, 6];
                case 5:
                    (0, assert_1.default)(application, 'web环境下 application必须存在web相关配置');
                    _c.label = 6;
                case 6: return [2 /*return*/, application.id];
            }
        });
    });
}
exports.getApplication = getApplication;
