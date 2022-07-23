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
exports.createWechatQrCode = void 0;
var assert_1 = require("oak-domain/lib/utils/assert");
function createWechatQrCode(options, context) {
    return __awaiter(this, void 0, void 0, function () {
        var entity, entityId, applicationId, tag, lifetimeLength, permanent, props, _a, appType, config, qrCodePrefix, id, data, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    entity = options.entity, entityId = options.entityId, applicationId = options.applicationId, tag = options.tag, lifetimeLength = options.lifetimeLength, permanent = options.permanent, props = options.props;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    _a = (_b.sent()), appType = _a.type, config = _a.config;
                    if (!(appType === 'wechatMp')) return [3 /*break*/, 7];
                    qrCodePrefix = config.qrCodePrefix;
                    return [4 /*yield*/, generateNewId()];
                case 2:
                    id = _b.sent();
                    if (!qrCodePrefix) return [3 /*break*/, 4];
                    data = {
                        id: id,
                        type: 'wechatMpDomainUrl',
                        tag: tag,
                        entity: entity,
                        entityId: entityId,
                        applicationId: applicationId,
                        allowShare: true,
                        permanent: true,
                        url: "".concat(qrCodePrefix, "/id"),
                        expired: false,
                        props: props,
                    };
                    return [4 /*yield*/, context.rowStore.operate('wechatQrCode', {
                            action: 'create',
                            data: data,
                        }, context)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, data];
                case 4:
                    data = {
                        id: id,
                        type: 'wechatMpWxaCode',
                        tag: tag,
                        entity: entity,
                        entityId: entityId,
                        applicationId: applicationId,
                        allowShare: true,
                        permanent: false,
                        expired: false,
                        props: props,
                    };
                    return [4 /*yield*/, context.rowStore.operate('wechatQrCode', {
                            action: 'create',
                            data: data,
                        }, context)];
                case 5:
                    _b.sent();
                    return [2 /*return*/, data];
                case 6: return [3 /*break*/, 8];
                case 7:
                    (0, assert_1.assert)(appType === 'wechatPublic');
                    // 还未实现，记得
                    throw new Error('method not implemented yet');
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
