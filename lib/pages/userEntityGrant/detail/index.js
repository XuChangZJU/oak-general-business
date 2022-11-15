"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        remark: 1,
        granterId: 1,
        granteeId: 1,
        expired: 1,
        expiresAt: 1,
        wechatQrCode$entity: {
            $entity: 'wechatQrCode',
            data: {
                id: 1,
                entity: 1,
                entityId: 1,
                type: 1,
                ticket: 1,
                url: 1,
                buffer: 1,
                expired: 1,
                expiresAt: 1,
                applicationId: 1,
            },
            filter: {
                entity: 'userEntityGrant',
            },
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var qrCodeUrl, buffer, newBuffer, newBufferToUint16, i, base64Str, binary, bytes, len, i, base64Str;
            var _b, _c;
            return tslib_1.__generator(this, function (_d) {
                qrCodeUrl = (_b = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.wechatQrCode$entity[0]) === null || _b === void 0 ? void 0 : _b.url;
                buffer = (_c = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.wechatQrCode$entity[0]) === null || _c === void 0 ? void 0 : _c.buffer;
                if (buffer) {
                    newBuffer = new ArrayBuffer(buffer.length * 2);
                    newBufferToUint16 = new Uint16Array(newBuffer);
                    for (i = 0; i < buffer.length; i++) {
                        newBufferToUint16[i] = buffer.charCodeAt(i);
                    }
                    if (process.env.OAK_PLATFORM === 'wechatMp') {
                        base64Str = wx.arrayBufferToBase64(newBufferToUint16);
                        qrCodeUrl = 'data:image/png;base64,' + base64Str;
                    }
                    else {
                        binary = '';
                        bytes = new Uint8Array(newBufferToUint16);
                        len = bytes.byteLength;
                        for (i = 0; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        base64Str = window.btoa(binary);
                        qrCodeUrl = 'data:image/png;base64,' + base64Str;
                    }
                }
                console.log(userEntityGrant);
                return [2 /*return*/, {
                        relation: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relation,
                        entity: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entity,
                        url: qrCodeUrl,
                        expired: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expired,
                        expiresAt: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expiresAt,
                    }];
            });
        });
    },
});
