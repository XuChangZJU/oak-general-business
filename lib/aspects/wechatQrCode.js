"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatQrCode = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
function createWechatQrCode(options, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var entity, entityId, applicationId, tag, lifetimeLength, permanent, props, _a, appType, config, qrCodePrefix, id, data, data, id, data, id, data;
        return tslib_1.__generator(this, function (_b) {
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
                case 6: return [3 /*break*/, 13];
                case 7:
                    if (!(appType === 'wechatPublic')) return [3 /*break*/, 10];
                    return [4 /*yield*/, generateNewId()];
                case 8:
                    id = _b.sent();
                    data = {
                        id: id,
                        type: 'wechatPublic',
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
                case 9:
                    _b.sent();
                    return [2 /*return*/, data];
                case 10:
                    (0, assert_1.assert)(appType === 'web');
                    return [4 /*yield*/, generateNewId()];
                case 11:
                    id = _b.sent();
                    data = {
                        id: id,
                        type: 'webForWechatPublic',
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
                case 12:
                    _b.sent();
                    return [2 /*return*/, data];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
