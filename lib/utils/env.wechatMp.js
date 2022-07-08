"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const lodash_1 = require("lodash");
async function getEnv() {
    const env = await wx.getSystemInfo();
    const env2 = (0, lodash_1.pick)(env, [
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
    return (0, lodash_1.assign)(env2, {
        type: 'wechatMp',
    });
}
exports.getEnv = getEnv;
