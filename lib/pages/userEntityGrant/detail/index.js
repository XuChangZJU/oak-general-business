"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        entity: 1,
        entityId: 1,
        relation: 1,
        type: 1,
        qrCodeType: 1,
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
        var _b, _c;
        var userEntityGrant = _a.data;
        var qrCodeUrl = (_b = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.wechatQrCode$entity[0]) === null || _b === void 0 ? void 0 : _b.url;
        var buffer = (_c = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.wechatQrCode$entity[0]) === null || _c === void 0 ? void 0 : _c.buffer;
        if (buffer) {
            var newBuffer = new ArrayBuffer(buffer.length * 2);
            var newBufferToUint16 = new Uint16Array(newBuffer);
            for (var i = 0; i < buffer.length; i++) {
                newBufferToUint16[i] = buffer.charCodeAt(i);
            }
            if (process.env.OAK_PLATFORM === 'wechatMp') {
                var base64Str = wx.arrayBufferToBase64(newBufferToUint16);
                qrCodeUrl = 'data:image/png;base64,' + base64Str;
            }
            else {
                var binary = '';
                var bytes = new Uint8Array(newBufferToUint16);
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                var base64Str = window.btoa(binary);
                qrCodeUrl = 'data:image/png;base64,' + base64Str;
            }
        }
        return {
            relation: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relation,
            entity: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entity,
            url: qrCodeUrl,
            expired: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expired,
            expiresAt: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.expiresAt,
        };
    },
});
