"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
var tslib_1 = require("tslib");
var DEV_CONFIG_1 = require("../data/DEV-CONFIG");
function getApplication(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, APP_ID, appId, url, _a, application;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    type = params.type;
                    APP_ID = {
                        web: DEV_CONFIG_1.DEV_WEB_APPLICATION_ID,
                        wechatMp: DEV_CONFIG_1.DEV_WECHATMP_APPLICATION_ID,
                        wechatPublic: DEV_CONFIG_1.DEV_WECHATPUPLIC_APPLICATION_ID,
                    };
                    appId = APP_ID[type];
                    url = context.getHeader('url');
                    console.log('url is', url);
                    return [4 /*yield*/, context.rowStore.select('application', {
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
                                }
                            },
                            filter: {
                                id: appId
                            }
                        }, context, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [(_b.sent()).result, 1]), application = _a[0];
                    return [2 /*return*/, application.id];
            }
        });
    });
}
exports.getApplication = getApplication;
