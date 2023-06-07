"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendRuntimeContext = void 0;
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var Exception_1 = require("../types/Exception");
var Exception_2 = require("oak-domain/lib/types/Exception");
var constants_1 = require("../constants");
var AsyncRowStore_1 = require("oak-domain/lib/store/AsyncRowStore");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var projection_1 = require("../types/projection");
var wechatQrCode_1 = require("../aspects/wechatQrCode");
/**
 * general数据结构要求的后台上下文
 */
var BackendRuntimeContext = /** @class */ (function (_super) {
    tslib_1.__extends(BackendRuntimeContext, _super);
    function BackendRuntimeContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackendRuntimeContext.prototype.refineOpRecords = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, opRecord, d, _c, _d, _i, entity, wechatQrCodeListObj, _e, _f, _g, id, wechatQrCodeData, buffer, e_1_1;
            var e_1, _h;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 11, 12, 13]);
                        _a = tslib_1.__values(this.opRecords), _b = _a.next();
                        _j.label = 1;
                    case 1:
                        if (!!_b.done) return [3 /*break*/, 10];
                        opRecord = _b.value;
                        if (!(opRecord.a === 's')) return [3 /*break*/, 9];
                        d = opRecord.d;
                        _c = [];
                        for (_d in d)
                            _c.push(_d);
                        _i = 0;
                        _j.label = 2;
                    case 2:
                        if (!(_i < _c.length)) return [3 /*break*/, 9];
                        entity = _c[_i];
                        if (!(entity === 'wechatQrCode')) return [3 /*break*/, 7];
                        wechatQrCodeListObj = d[entity];
                        _e = [];
                        for (_f in wechatQrCodeListObj)
                            _e.push(_f);
                        _g = 0;
                        _j.label = 3;
                    case 3:
                        if (!(_g < _e.length)) return [3 /*break*/, 6];
                        id = _e[_g];
                        wechatQrCodeData = wechatQrCodeListObj[id];
                        if (!(wechatQrCodeData.hasOwnProperty('buffer') &&
                            wechatQrCodeData.type === 'wechatMpWxaCode')) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, wechatQrCode_1.getMpUnlimitWxaCode)(id, this)];
                    case 4:
                        buffer = _j.sent();
                        Object.assign(wechatQrCodeData, {
                            buffer: buffer,
                        });
                        _j.label = 5;
                    case 5:
                        _g++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        if (['application', 'system', 'platform'].includes(entity)) {
                            // todo 删除掉config中的敏感返回信息
                        }
                        _j.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 2];
                    case 9:
                        _b = _a.next();
                        return [3 /*break*/, 1];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_1_1 = _j.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_b && !_b.done && (_h = _a.return)) _h.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.setTokenValue = function (tokenValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, token, user, player, userRole$user, userRole$player;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.select('token', {
                            data: {
                                id: 1,
                                userId: 1,
                                playerId: 1,
                                player: {
                                    id: 1,
                                    userState: 1,
                                    userRole$user: {
                                        $entity: 'userRole',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                            roleId: 1,
                                            role: {
                                                id: 1,
                                                name: 1,
                                            },
                                        },
                                    },
                                },
                                ableState: 1,
                                user: {
                                    id: 1,
                                    userState: 1,
                                    userRole$user: {
                                        $entity: 'userRole',
                                        data: {
                                            id: 1,
                                            userId: 1,
                                            roleId: 1,
                                            role: {
                                                id: 1,
                                                name: 1,
                                            },
                                        },
                                    },
                                },
                            },
                            filter: {
                                id: tokenValue,
                            },
                        }, {
                            dontCollect: true,
                            blockTrigger: true,
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.length === 0) {
                            console.log("\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94tokenValue\u300C".concat(tokenValue, "\u627E\u4E0D\u5230\u76F8\u5173\u7684user"));
                            // throw new OakTokenExpiredException();
                            this.tokenException = new Exception_1.OakTokenExpiredException();
                            return [2 /*return*/];
                        }
                        token = result[0];
                        if (token.ableState === 'disabled') {
                            console.log("\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94tokenValue\u300C".concat(tokenValue, "\u5DF2\u7ECF\u88ABdisable"));
                            this.tokenException = new Exception_1.OakTokenExpiredException();
                            return [2 /*return*/];
                        }
                        user = token.user, player = token.player;
                        userRole$user = user.userRole$user;
                        this.amIRoot =
                            userRole$user.length > 0 &&
                                userRole$user.find(function (ele) { return ele.role.name === 'root'; });
                        userRole$player = player.userRole$user;
                        this.amIReallyRoot =
                            userRole$player.length > 0 &&
                                userRole$player.find(function (ele) { return ele.role.name === 'root'; });
                        this.token = token;
                        return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.setApplication = function (appId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.select('application', {
                            data: projection_1.applicationProjection,
                            filter: {
                                id: appId,
                            },
                        }, {
                            dontCollect: true,
                            blockTrigger: true,
                        })];
                    case 1:
                        result = _a.sent();
                        (0, assert_1.default)(result.length > 0, "\u6784\u5EFABackendRuntimeContext\u5BF9\u5E94appId\u300C".concat(appId, "\u300D\u627E\u4E0D\u5230application"));
                        this.application = result[0];
                        return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.initialize = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var appId, tokenValue, promises, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.begin()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        appId = data.a, tokenValue = data.t;
                        promises = [];
                        if (appId) {
                            promises.push(this.setApplication(appId));
                        }
                        if (tokenValue) {
                            promises.push(this.setTokenValue(tokenValue));
                        }
                        if (!(promises.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.commit()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.rollback()];
                    case 7:
                        _a.sent();
                        throw err_1;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        // 否则是后台模式，默认用root
                        this.rootMode = true;
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.getApplicationId = function () {
        var _a;
        return (_a = this.application) === null || _a === void 0 ? void 0 : _a.id;
    };
    BackendRuntimeContext.prototype.getSystemId = function () {
        var _a;
        return (_a = this.application) === null || _a === void 0 ? void 0 : _a.systemId;
    };
    BackendRuntimeContext.prototype.getApplication = function () {
        return this.application;
    };
    BackendRuntimeContext.prototype.getTokenValue = function (allowUnloggedIn) {
        var _a;
        if (this.rootMode) {
            return constants_1.ROOT_TOKEN_ID;
        }
        if (this.tokenException) {
            throw this.tokenException;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new Exception_2.OakUnloggedInException();
        }
        return (_a = this.token) === null || _a === void 0 ? void 0 : _a.id;
    };
    BackendRuntimeContext.prototype.getToken = function (allowUnloggedIn) {
        if (this.tokenException) {
            throw this.tokenException;
        }
        if (!this.token && !allowUnloggedIn) {
            throw new Exception_2.OakUnloggedInException();
        }
        if (this.token) {
            var userState = this.token.user.userState;
            if (['disabled', 'merged'].includes(userState) &&
                !this.isReallyRoot()) {
                throw new Exception_1.OakUserDisabledException();
            }
        }
        return this.token;
    };
    BackendRuntimeContext.prototype.getCurrentUserId = function (allowUnloggedIn) {
        if (this.rootMode) {
            return constants_1.ROOT_USER_ID;
        }
        if (this.temporaryUserId) {
            return this.temporaryUserId;
        }
        var token = this.getToken(allowUnloggedIn);
        return token === null || token === void 0 ? void 0 : token.userId;
    };
    BackendRuntimeContext.prototype.setTemporaryUserId = function (userId) {
        this.temporaryUserId = userId;
    };
    BackendRuntimeContext.prototype.toString = function () {
        var _a, _b;
        if (this.rootMode) {
            return JSON.stringify({ rootMode: true });
        }
        return JSON.stringify({ a: (_a = this.application) === null || _a === void 0 ? void 0 : _a.id, t: (_b = this.token) === null || _b === void 0 ? void 0 : _b.id });
    };
    BackendRuntimeContext.prototype.isRoot = function () {
        if (this.rootMode) {
            return true;
        }
        return !!this.amIRoot;
    };
    BackendRuntimeContext.prototype.isReallyRoot = function () {
        return !!this.amIReallyRoot;
    };
    BackendRuntimeContext.prototype.sendMessage = function (data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.operate;
                        _b = ['message'];
                        _c = {};
                        return [4 /*yield*/, (0, uuid_1.generateNewIdAsync)()];
                    case 1: return [2 /*return*/, _a.apply(this, _b.concat([(_c.id = _d.sent(),
                                _c.action = 'create',
                                _c.data = data,
                                _c), {
                                dontCollect: true,
                            }]))];
                }
            });
        });
    };
    BackendRuntimeContext.prototype.allowUserUpdate = function () {
        var _a;
        if (this.isReallyRoot()) {
            return true;
        }
        var userInfo = (_a = this.token) === null || _a === void 0 ? void 0 : _a.user;
        if (userInfo) {
            var userState = userInfo.userState;
            if (userState === 'disabled') {
                throw new Exception_1.OakUserDisabledException('您的帐号已经被禁用，请联系客服');
            }
            else if (['shadow', 'merged'].includes(userState)) {
                throw new Exception_1.OakTokenExpiredException('您的登录状态有异常，请重新登录 ');
            }
            else {
                (0, assert_1.default)(userState === 'normal');
            }
            return true;
        }
        throw new Exception_2.OakUnloggedInException('您尚未登录');
    };
    return BackendRuntimeContext;
}(AsyncRowStore_1.AsyncContext));
exports.BackendRuntimeContext = BackendRuntimeContext;
