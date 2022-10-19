"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakPage({
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
            },
            filter: {
                entity: 'userEntityGrant',
                expired: false,
            },
            indexFrom: 0,
            count: 1,
        },
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var qrCodeUrl, str, buf, buf2, i;
            var _b, _c;
            return tslib_1.__generator(this, function (_d) {
                console.log(userEntityGrant);
                str = (_b = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.wechatQrCode$entity[0]) === null || _b === void 0 ? void 0 : _b.buffer;
                if (str) {
                    buf = new ArrayBuffer(str.length * 2);
                    buf2 = new Uint16Array(buf);
                    for (i = 0; i < str.length; i++) {
                        buf2[i] = str.charCodeAt(i);
                    }
                    qrCodeUrl =
                        'data:image/jpeg;base64,' + wx.arrayBufferToBase64(buf2);
                }
                return [2 /*return*/, {
                        relation: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relation,
                        entity: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.entity,
                        url: qrCodeUrl || ((_c = userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.wechatQrCode$entity[0]) === null || _c === void 0 ? void 0 : _c.url),
                    }];
            });
        });
    },
});
