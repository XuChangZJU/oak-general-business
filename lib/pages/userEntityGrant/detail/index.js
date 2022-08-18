"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakPage({
    path: 'userEntityGrant:detail',
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
        return __awaiter(void 0, void 0, void 0, function () {
            var qrCodeUrl, str, buf, buf2, i;
            var _b, _c;
            return __generator(this, function (_d) {
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
