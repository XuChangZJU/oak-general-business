"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayBackUrl = exports.getStreamObj = exports.getLivestream = void 0;
var tslib_1 = require("tslib");
var getContextConfig_1 = require("./getContextConfig");
var assert_1 = require("oak-domain/lib/utils/assert");
/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
function getLivestream(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var streamTitle, expireAt, origin, _a, instance, config, _b, hub, liveHost, publishDomain, playDomain, playKey, publishKey;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    streamTitle = params.streamTitle, expireAt = params.expireAt, origin = params.origin;
                    return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Live', origin)];
                case 1:
                    _a = _c.sent(), instance = _a.instance, config = _a.config;
                    (0, assert_1.assert)(origin === 'qiniu');
                    _b = config, hub = _b.hub, liveHost = _b.liveHost, publishDomain = _b.publishDomain, playDomain = _b.playDomain, playKey = _b.playKey, publishKey = _b.publishKey;
                    return [2 /*return*/, instance.getLiveStream(hub, 'POST', streamTitle, liveHost, publishDomain, playDomain, publishKey, playKey, expireAt)];
            }
        });
    });
}
exports.getLivestream = getLivestream;
// 获取推拉流地址
/**
 * 直播流已存在的情况下，获取推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns livestream对象
 */
function getStreamObj(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var streamTitle, expireAt, origin, _a, instance, config, _b, publishDomain, publishKey, playDomain, playKey, hub;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    streamTitle = params.streamTitle, expireAt = params.expireAt, origin = params.origin;
                    return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Live', origin)];
                case 1:
                    _a = _c.sent(), instance = _a.instance, config = _a.config;
                    (0, assert_1.assert)(origin === 'qiniu');
                    _b = config, publishDomain = _b.publishDomain, publishKey = _b.publishKey, playDomain = _b.playDomain, playKey = _b.playKey, hub = _b.hub;
                    return [2 /*return*/, instance.getStreamObj(publishDomain, playDomain, hub, publishKey, playKey, streamTitle, expireAt)];
            }
        });
    });
}
exports.getStreamObj = getStreamObj;
// 生成直播回放
function getPlayBackUrl(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var streamTitle, start, end, origin, _a, config, instance, _b, hub, playBackDomain, liveHost;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    streamTitle = params.streamTitle, start = params.start, end = params.end, origin = params.origin;
                    return [4 /*yield*/, (0, getContextConfig_1.getConfig)(context, 'Live', origin)];
                case 1:
                    _a = _c.sent(), config = _a.config, instance = _a.instance;
                    _b = config, hub = _b.hub, playBackDomain = _b.playBackDomain, liveHost = _b.liveHost;
                    return [2 /*return*/, instance.getPlayBackUrl(hub, playBackDomain, streamTitle, start, end, 'POST', liveHost)];
            }
        });
    });
}
exports.getPlayBackUrl = getPlayBackUrl;
