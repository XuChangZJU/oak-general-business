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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("oak-domain/lib/utils/assert");
var oak_external_sdk_1 = require("oak-external-sdk");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var triggers = [
    {
        name: '选择wechatQrCode时，动态生成需要的数据',
        entity: 'wechatQrCode',
        action: 'select',
        when: 'after',
        fn: function (_a, context, params) {
            var result = _a.result;
            return __awaiter(void 0, void 0, void 0, function () {
                var count, application, _b, type, config, config2, appId, appSecret, result_1, result_1_1, code, type_1, expired, id, wechatInstance, buffer, str, e_1_1;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            count = 0;
                            return [4 /*yield*/, context.getApplication()];
                        case 1:
                            application = _d.sent();
                            _b = application, type = _b.type, config = _b.config;
                            (0, assert_1.assert)(type === 'wechatMp' || config.type === 'wechatMp');
                            config2 = config;
                            appId = config2.appId, appSecret = config2.appSecret;
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 8, 9, 10]);
                            result_1 = __values(result), result_1_1 = result_1.next();
                            _d.label = 3;
                        case 3:
                            if (!!result_1_1.done) return [3 /*break*/, 7];
                            code = result_1_1.value;
                            type_1 = code.type, expired = code.expired, id = code.id;
                            if (!(type_1 === 'wechatMpWxaCode' && code.hasOwnProperty('buffer'))) return [3 /*break*/, 5];
                            wechatInstance = oak_external_sdk_1.WechatSDK.getInstance(appId, appSecret, 'wechatMp');
                            return [4 /*yield*/, wechatInstance.getMpUnlimitWxaCode({
                                    scene: (0, uuid_1.shrinkUuidTo32Bytes)(id),
                                    page: 'pages/index/index', // todo，这里用其它的页面微信服务器拒绝，因为没发布。应该是 pages/wechatQrCode/scan/index
                                })];
                        case 4:
                            buffer = _d.sent();
                            str = String.fromCharCode.apply(String, __spreadArray([], __read(new Uint8Array(buffer)), false));
                            Object.assign(code, {
                                buffer: str,
                            });
                            count++;
                            return [3 /*break*/, 6];
                        case 5:
                            if (expired && code.hasOwnProperty('url')) {
                                // 如果过期了，在这里生成新的临时码并修改值（公众号）
                                throw new Error('not implemented yet');
                            }
                            _d.label = 6;
                        case 6:
                            result_1_1 = result_1.next();
                            return [3 /*break*/, 3];
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 10];
                        case 9:
                            try {
                                if (result_1_1 && !result_1_1.done && (_c = result_1.return)) _c.call(result_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/, count];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
