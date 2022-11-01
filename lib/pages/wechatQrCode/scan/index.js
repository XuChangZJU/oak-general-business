"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    entity: 'wechatQrCode',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        type: 1,
        ticket: 1,
        url: 1,
        expired: 1,
        buffer: 1,
        props: 1,
    },
    isList: true,
    filters: [
        {
            filter: function (_a) {
                var props = _a.props;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var scene, uuid;
                    return tslib_1.__generator(this, function (_b) {
                        scene = decodeURIComponent(props.scene);
                        uuid = scene && (0, uuid_1.expandUuidTo36Bytes)(scene);
                        return [2 /*return*/, {
                                id: uuid,
                            }];
                    });
                });
            },
        },
    ],
    formData: function (_a) {
        var wechatQrCodes = _a.data;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wechatQrCode, _b, props, pathname, url, param, param2;
            return tslib_1.__generator(this, function (_c) {
                wechatQrCode = wechatQrCodes[0];
                if (!wechatQrCode) {
                    return [2 /*return*/, {
                            isExist: false,
                        }];
                }
                if (!wechatQrCode.expired) {
                    _b = wechatQrCode.props, props = _b.props, pathname = _b.pathname;
                    url = pathname.substring(0, 1) === '/'
                        ? pathname
                        : "/".concat(pathname);
                    if (props) {
                        for (param in props) {
                            param2 = param;
                            url += url.includes('?') ? '&' : '?';
                            url += "".concat(param, "=").concat(typeof props[param2] === 'string'
                                ? props[param2]
                                : JSON.stringify(props[param2]));
                        }
                    }
                    this.redirectTo({
                        url: url,
                    });
                    return [2 /*return*/, {
                            expired: false,
                        }];
                }
                else {
                    return [2 /*return*/, {
                            expired: true,
                        }];
                }
                return [2 /*return*/];
            });
        });
    },
});
