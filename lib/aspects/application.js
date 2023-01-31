"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
var projection_1 = require("../types/projection");
function getApplication(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, domain, url, _a, application, _b, application2;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    type = params.type, domain = params.domain;
                    url = context.getHeader('host');
                    console.log('url is', url);
                    return [4 /*yield*/, context.select('application', {
                            data: projection_1.applicationProjection,
                            filter: {
                                type: type,
                                system: {
                                    id: {
                                        $in: {
                                            entity: 'domain',
                                            data: {
                                                systemId: 1,
                                            },
                                            filter: {
                                                url: domain,
                                            },
                                        },
                                    },
                                },
                            },
                        }, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application = _a[0];
                    if (!(type === 'wechatMp')) return [3 /*break*/, 2];
                    (0, assert_1.assert)(application, '微信小程序环境下 application必须存在小程序相关配置');
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
                                style: 1,
                                system: {
                                    id: 1,
                                    name: 1,
                                    config: 1,
                                    platformId: 1,
                                    style: 1,
                                    folder: 1,
                                    platform: {
                                        id: 1,
                                        config: 1,
                                        style: 1,
                                    },
                                },
                            },
                            filter: {
                                type: 'web',
                                system: {
                                    id: {
                                        $in: {
                                            entity: 'domain',
                                            data: {
                                                systemId: 1,
                                            },
                                            filter: {
                                                url: domain,
                                            },
                                        },
                                    },
                                },
                            },
                        }, {})];
                case 3:
                    _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application2 = _b[0];
                    (0, assert_1.assert)(application2, '微信公众号环境下 application不存在公众号配置，但必须存在web相关配置');
                    return [2 /*return*/, application2.id];
                case 4: return [3 /*break*/, 6];
                case 5:
                    (0, assert_1.assert)(application, 'web环境下 application必须存在web相关配置');
                    _c.label = 6;
                case 6: return [2 /*return*/, application.id];
            }
        });
    });
}
exports.getApplication = getApplication;
