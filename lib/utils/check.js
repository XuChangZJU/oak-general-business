"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCheckers = void 0;
var tslib_1 = require("tslib");
var constants_1 = require("../constants");
function checkIsRoot(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var token, playerId, count;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.getToken()];
                case 1:
                    token = _a.sent();
                    if (!token) {
                        return [2 /*return*/, false];
                    }
                    playerId = token.playerId;
                    return [4 /*yield*/, context.rowStore.count('userRole', {
                            filter: {
                                userId: playerId,
                                roleId: constants_1.ROOT_ROLE_ID,
                            },
                        }, context)];
                case 2:
                    count = _a.sent();
                    if (count === 0) {
                        // 只有root允许扮演其他用户身份
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
function processCheckers(checkers) {
    var e_1, _a;
    var _this = this;
    var _loop_1 = function (checker) {
        var type = checker.type, fn = checker.checker;
        if (type === 'user') {
            Object.assign(checker, {
                checker: function (dummy, context) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, checkIsRoot(context)];
                            case 1:
                                if (_a.sent()) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, fn(dummy, context)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); },
            });
        }
    };
    try {
        // 对user类型的checker，加上root的自动检测
        for (var checkers_1 = tslib_1.__values(checkers), checkers_1_1 = checkers_1.next(); !checkers_1_1.done; checkers_1_1 = checkers_1.next()) {
            var checker = checkers_1_1.value;
            _loop_1(checker);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (checkers_1_1 && !checkers_1_1.done && (_a = checkers_1.return)) _a.call(checkers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.processCheckers = processCheckers;
