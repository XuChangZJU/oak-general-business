"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var triggers = [
    {
        name: '切换微信扫码登录方式',
        entity: 'application',
        action: 'update',
        when: 'after',
        fn: function (_a, context) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, _b, application, config, toggleEnabelFn, wechat;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            return [4 /*yield*/, context.select('application', {
                                    data: {
                                        id: 1,
                                        config: 1,
                                    },
                                    filter: {
                                        id: filter === null || filter === void 0 ? void 0 : filter.id,
                                    },
                                    count: 1,
                                }, {})];
                        case 1:
                            _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), application = _b[0];
                            config = (application || {}).config;
                            toggleEnabelFn = function (type) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                var _a, applicationP, _b, config2, id, _c, _d, _e;
                                var _f;
                                return tslib_1.__generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0: return [4 /*yield*/, context.select('application', {
                                                data: {
                                                    id: 1,
                                                    config: 1,
                                                },
                                                filter: {
                                                    type: type,
                                                },
                                                count: 1,
                                            }, {})];
                                        case 1:
                                            _a = tslib_1.__read.apply(void 0, [_g.sent(), 1]), applicationP = _a[0];
                                            _b = applicationP || {}, config2 = _b.config, id = _b.id;
                                            if (!(config2 && config2.type === type)) return [3 /*break*/, 4];
                                            if (type === 'web') {
                                                (0, lodash_1.set)(config2, 'wechat.enable', false);
                                            }
                                            if (type === 'wechatPublic') {
                                                Object.assign(config2, {
                                                    enable: false
                                                });
                                            }
                                            _d = (_c = context).operate;
                                            _e = ['application'];
                                            _f = {};
                                            return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                        case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([(_f.id = _g.sent(),
                                                    _f.action = 'update',
                                                    _f.data = {
                                                        config: config2,
                                                    },
                                                    _f.filter = {
                                                        id: id,
                                                    },
                                                    _f), {}]))];
                                        case 3:
                                            _g.sent();
                                            _g.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); };
                            if ((config === null || config === void 0 ? void 0 : config.type) === 'web') {
                                wechat = config.wechat;
                                if (wechat && wechat.enable) {
                                    toggleEnabelFn('wechatPublic');
                                }
                            }
                            else if ((config === null || config === void 0 ? void 0 : config.type) === 'wechatPublic') {
                                if (config.enable) {
                                    toggleEnabelFn('web');
                                }
                            }
                            return [2 /*return*/, 1];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
