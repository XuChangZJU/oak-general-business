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
        expiresAt: 1,
    },
    isList: true,
    properties: {
        scene: String,
    },
    data: {
        loading: true,
    },
    listeners: {
        oakLoading: function (prev, next) {
            if (!!prev.oakLoading && !next.oakLoading) {
                this.setState({
                    loading: false,
                });
            }
        }
    },
    filters: [
        {
            filter: function () {
                var scene = decodeURIComponent(this.props.scene);
                var uuid = scene && (0, uuid_1.expandUuidTo36Bytes)(scene);
                return {
                    id: uuid || 'illegal',
                };
            },
        },
    ],
    formData: function (_a) {
        var wechatQrCodes = _a.data, props = _a.props;
        var wechatQrCode = wechatQrCodes[0];
        if (!wechatQrCode) {
            return {
                isExist: false,
            };
        }
        var scene = decodeURIComponent(props.scene);
        var uuid = scene && (0, uuid_1.expandUuidTo36Bytes)(scene);
        if (wechatQrCode.id !== uuid) {
            return {
                isExist: false,
            };
        }
        else if (!wechatQrCode.expired) {
            var _b = wechatQrCode.props, _c = _b.props, props_1 = _c === void 0 ? {} : _c, _d = _b.state, state = _d === void 0 ? {} : _d, pathname = _b.pathname;
            var url = pathname.substring(0, 1) === '/'
                ? pathname
                : "/".concat(pathname);
            this.redirectTo(tslib_1.__assign({ url: url }, props_1), state);
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
