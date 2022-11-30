"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplication = void 0;
var tslib_1 = require("tslib");
function getApplication(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, domain, url, _a, application;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    type = params.type, domain = params.domain;
                    url = context.getHeader('host');
                    console.log('url is', url);
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
                                }
                            },
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
                                            }
                                        }
                                    }
                                },
                            },
                        }, {})];
                case 1:
                    _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), application = _a[0];
                    return [2 /*return*/, application.id];
            }
        });
    });
}
exports.getApplication = getApplication;
