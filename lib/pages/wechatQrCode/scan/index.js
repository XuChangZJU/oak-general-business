"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                var scene = decodeURIComponent(props.scene);
                var uuid = scene && (0, uuid_1.expandUuidTo36Bytes)(scene);
                return {
                    id: uuid,
                };
            },
        },
    ],
    formData: function (_a) {
        var wechatQrCodes = _a.data;
        var wechatQrCode = wechatQrCodes[0];
        if (!wechatQrCode) {
            return {
                isExist: false,
            };
        }
        if (!wechatQrCode.expired) {
            var _b = wechatQrCode.props, props = _b.props, pathname = _b.pathname;
            var url = pathname.substring(0, 1) === '/'
                ? pathname
                : "/".concat(pathname);
            if (props) {
                for (var param in props) {
                    var param2 = param;
                    url += url.includes('?') ? '&' : '?';
                    url += "".concat(param, "=").concat(typeof props[param2] === 'string'
                        ? props[param2]
                        : JSON.stringify(props[param2]));
                }
            }
            this.redirectTo({
                url: url,
            });
            return {
                expired: false,
            };
        }
        else {
            return {
                expired: true,
            };
        }
    },
});
