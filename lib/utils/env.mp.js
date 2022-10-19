"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
var tslib_1 = require("tslib");
var lodash_1 = require("oak-domain/lib/utils/lodash");
function getEnv() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var env, env2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wx.getSystemInfo()];
                case 1:
                    env = _a.sent();
                    env2 = (0, lodash_1.pick)(env, [
                        'brand',
                        'model',
                        'pixelRatio',
                        'screenWidth',
                        'screenHeight',
                        'windowWidth',
                        'windowHeight',
                        'statusBarHeight',
                        'language',
                        'version',
                        'system',
                        'platform',
                        'fontSizeSetting',
                        'SDKVersion'
                    ]);
                    return [2 /*return*/, Object.assign(env2, {
                            type: 'wechatMp',
                        })];
            }
        });
    });
}
exports.getEnv = getEnv;
