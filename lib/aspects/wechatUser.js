"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbindingWechat = void 0;
var tslib_1 = require("tslib");
var types_1 = require("oak-domain/lib/types");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var assert_1 = tslib_1.__importDefault(require("assert"));
function unbindingWechat(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var wechatUserId, captcha, mobile, fn, result, _a, captchaRow;
        var _this = this;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wechatUserId = params.wechatUserId, captcha = params.captcha, mobile = params.mobile;
                    fn = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var userId, _a, wechatUser, _b, _c, _d;
                        var _e;
                        return tslib_1.__generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    userId = context.getCurrentUserId();
                                    return [4 /*yield*/, context.select('wechatUser', {
                                            data: {
                                                id: 1,
                                                userId: 1,
                                            },
                                            filter: {
                                                id: wechatUserId,
                                            }
                                        }, {})];
                                case 1:
                                    _a = tslib_1.__read.apply(void 0, [_f.sent(), 1]), wechatUser = _a[0];
                                    (0, assert_1.default)(wechatUser.userId === userId, '查询到的wechatUser.userId与当前登录者不相同');
                                    _c = (_b = context).operate;
                                    _d = ['wechatUser'];
                                    _e = {};
                                    return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                                case 2: return [4 /*yield*/, _c.apply(_b, _d.concat([(_e.id = _f.sent(),
                                            _e.action = 'update',
                                            _e.data = {
                                                userId: null,
                                            },
                                            _e.filter = {
                                                id: wechatUserId,
                                            },
                                            _e), {
                                            dontCollect: true,
                                        }]))];
                                case 3:
                                    _f.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!(mobile && captcha)) return [3 /*break*/, 2];
                    return [4 /*yield*/, context.select('captcha', {
                            data: {
                                id: 1,
                                expired: 1,
                            },
                            filter: {
                                mobile: mobile,
                                code: captcha,
                            },
                            sorter: [{
                                    $attr: {
                                        $$createAt$$: 1,
                                    },
                                    $direction: 'desc',
                                }],
                            indexFrom: 0,
                            count: 1,
                        }, { dontCollect: true })];
                case 1:
                    result = _b.sent();
                    if (result.length > 0) {
                        _a = tslib_1.__read(result, 1), captchaRow = _a[0];
                        if (captchaRow.expired) {
                            throw new types_1.OakUserException('验证码已经过期');
                        }
                        fn();
                    }
                    else {
                        throw new types_1.OakUserException('验证码无效');
                    }
                    return [3 /*break*/, 3];
                case 2:
                    fn();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.unbindingWechat = unbindingWechat;
