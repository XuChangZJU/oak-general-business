"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWechatLogin = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
function createWechatLogin(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, interval, userId, id, createData, _a, _b, _c;
        var _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    type = params.type, interval = params.interval;
                    if (type === 'bind') {
                        userId = context.getCurrentUserId();
                    }
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 1:
                    id = _e.sent();
                    createData = {
                        id: id,
                        type: type,
                        expiresAt: Date.now() + interval,
                        expired: false,
                        qrCodeType: 'wechatPublic',
                        successed: false,
                    };
                    if (userId) {
                        Object.assign(createData, {
                            userId: userId,
                        });
                    }
                    _b = (_a = context).operate;
                    _c = ['wechatLogin'];
                    _d = {};
                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                case 2: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.id = _e.sent(),
                            _d.action = 'create',
                            _d.data = createData,
                            _d), {
                            dontCollect: true,
                        }]))];
                case 3:
                    _e.sent();
                    return [2 /*return*/, id];
            }
        });
    });
}
exports.createWechatLogin = createWechatLogin;
