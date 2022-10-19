"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatQrCode = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
function createWechatQrCode(options, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var entity, entityId, applicationId, tag, lifetimeLength, permanent, props, _a, appType, config, qrCodePrefix, id, data, _b, _c, _d, data, _e, _f, _g, id, data, _h, _j, _k, id, data, _l, _m, _o;
        var _p, _q, _r, _s;
        return tslib_1.__generator(this, function (_t) {
            switch (_t.label) {
                case 0:
                    entity = options.entity, entityId = options.entityId, applicationId = options.applicationId, tag = options.tag, lifetimeLength = options.lifetimeLength, permanent = options.permanent, props = options.props;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    _a = (_t.sent()), appType = _a.type, config = _a.config;
                    if (!(appType === 'wechatMp')) return [3 /*break*/, 9];
                    qrCodePrefix = config.qrCodePrefix;
                    return [4 /*yield*/, generateNewId()];
                case 2:
                    id = _t.sent();
                    if (!qrCodePrefix) return [3 /*break*/, 5];
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
                    _c = (_b = context.rowStore).operate;
                    _d = ['wechatQrCode'];
                    _p = {};
                    return [4 /*yield*/, generateNewId()];
                case 3: return [4 /*yield*/, _c.apply(_b, _d.concat([(_p.id = _t.sent(),
                            _p.action = 'create',
                            _p.data = data,
                            _p), context,
                        {
                            dontCollect: true,
                        }]))];
                case 4:
                    _t.sent();
                    return [2 /*return*/, data];
                case 5:
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
                    _f = (_e = context.rowStore).operate;
                    _g = ['wechatQrCode'];
                    _q = {};
                    return [4 /*yield*/, generateNewId()];
                case 6: return [4 /*yield*/, _f.apply(_e, _g.concat([(_q.id = _t.sent(),
                            _q.action = 'create',
                            _q.data = data,
                            _q), context,
                        {
                            dontCollect: true,
                        }]))];
                case 7:
                    _t.sent();
                    return [2 /*return*/, data];
                case 8: return [3 /*break*/, 17];
                case 9:
                    if (!(appType === 'wechatPublic')) return [3 /*break*/, 13];
                    return [4 /*yield*/, generateNewId()];
                case 10:
                    id = _t.sent();
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
                    _j = (_h = context.rowStore).operate;
                    _k = ['wechatQrCode'];
                    _r = {};
                    return [4 /*yield*/, generateNewId()];
                case 11: return [4 /*yield*/, _j.apply(_h, _k.concat([(_r.id = _t.sent(),
                            _r.action = 'create',
                            _r.data = data,
                            _r), context,
                        {
                            dontCollect: true,
                        }]))];
                case 12:
                    _t.sent();
                    return [2 /*return*/, data];
                case 13:
                    (0, assert_1.assert)(appType === 'web');
                    return [4 /*yield*/, generateNewId()];
                case 14:
                    id = _t.sent();
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
                    _m = (_l = context.rowStore).operate;
                    _o = ['wechatQrCode'];
                    _s = {};
                    return [4 /*yield*/, generateNewId()];
                case 15: return [4 /*yield*/, _m.apply(_l, _o.concat([(_s.id = _t.sent(),
                            _s.action = 'create',
                            _s.data = data,
                            _s), context,
                        {
                            dontCollect: true,
                        }]))];
                case 16:
                    _t.sent();
                    return [2 /*return*/, data];
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.createWechatQrCode = createWechatQrCode;
