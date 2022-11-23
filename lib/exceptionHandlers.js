"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDict = void 0;
var tslib_1 = require("tslib");
var Exception_1 = require("oak-domain/lib/types/Exception");
var Exception_2 = require("./types/Exception");
exports.handlerDict = (_a = {},
    _a[Exception_1.OakUnloggedInException.name] = function (features) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, features.token.logout()];
                case 1:
                    _a.sent();
                    features.navigator.navigateTo({
                        url: '/mobile/login',
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    _a[Exception_2.OakTokenExpiredException.name] = function (features) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, features.token.logout()];
                case 1:
                    _a.sent();
                    features.navigator.navigateTo({
                        url: '/mobile/login',
                    });
                    return [2 /*return*/];
            }
        });
    }); },
    _a);
