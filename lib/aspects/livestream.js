"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLivestream2 = exports.getLivestream = void 0;
var tslib_1 = require("tslib");
var qiniu_live_1 = tslib_1.__importDefault(require("../utils/externalUpload/qiniu_live"));
var sign_1 = require("../utils/sign");
var ts_md5_1 = require("ts-md5");
function getQiniuUploadInfo(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, application, _a, type, config, systemId, origin, _b, system, systemConfig, originConfig;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    rowStore = context.rowStore;
                    return [4 /*yield*/, context.getApplication()];
                case 1:
                    application = _c.sent();
                    _a = application, type = _a.type, config = _a.config, systemId = _a.systemId;
                    origin = "qiniu";
                    return [4 /*yield*/, rowStore.select('system', {
                            data: {
                                id: 1,
                                config: 1
                            },
                            filter: {
                                id: systemId
                            }
                        }, context, {
                            dontCollect: true,
                        })];
                case 2:
                    _b = tslib_1.__read.apply(void 0, [(_c.sent()).result, 1]), system = _b[0];
                    try {
                        systemConfig = system.config;
                        originConfig = systemConfig.Cos[origin];
                        return [2 /*return*/, originConfig];
                    }
                    catch (err) {
                        throw err;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function getQiniuToken(config, params) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var method, path, rawQuery, contentType, bodyStr, liveHost, accessKey, secretKey, instance, token;
        return tslib_1.__generator(this, function (_a) {
            method = params.method, path = params.path, rawQuery = params.rawQuery, contentType = params.contentType, bodyStr = params.bodyStr;
            liveHost = config.liveHost, accessKey = config.accessKey, secretKey = config.secretKey;
            // 请求鉴权
            try {
                instance = new qiniu_live_1.default({
                    accessKey: accessKey,
                    secretKey: secretKey,
                    host: liveHost,
                    method: method,
                    path: path,
                    rawQuery: rawQuery,
                    contentType: contentType,
                    bodyStr: bodyStr,
                });
                token = instance.getToken();
                // 拿到鉴权Token
                return [2 /*return*/, {
                        token: token,
                    }];
            }
            catch (err) {
                throw err;
            }
            return [2 /*return*/];
        });
    });
}
/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
function getLivestream(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var streamTitle, expireAt, config, hub, path, key, bodyStr, contentType, token, url, obj;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    streamTitle = params.streamTitle, expireAt = params.expireAt;
                    return [4 /*yield*/, getQiniuUploadInfo(context)];
                case 1:
                    config = _a.sent();
                    hub = config.hub;
                    path = "/v2/hubs/".concat(hub, "/streams");
                    key = streamTitle;
                    if (!key) {
                        key = "class".concat(new Date().getTime());
                    }
                    bodyStr = JSON.stringify({
                        key: key,
                    });
                    contentType = 'application/json';
                    return [4 /*yield*/, getQiniuToken(config, {
                            method: 'POST',
                            path: path,
                            contentType: contentType,
                            bodyStr: bodyStr,
                        })];
                case 2:
                    token = (_a.sent()).token;
                    url = "http://pili.qiniuapi.com/v2/hubs/".concat(hub, "/streams");
                    console.log(bodyStr, url, token);
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            Authorization: token,
                            'Content-Type': contentType,
                        },
                        body: bodyStr,
                        mode: 'no-cors',
                    })
                        .then(function (res) {
                        console.log(res.json());
                    }).then(function (res) {
                        console.log(res);
                    }).catch(function (e) {
                        console.log(e);
                    });
                    return [4 /*yield*/, getStreamObj(config, streamTitle, expireAt)];
                case 3:
                    obj = _a.sent();
                    return [2 /*return*/, obj];
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
function getLivestream2(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var streamTitle, expireAt, config, livestream;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    streamTitle = params.streamTitle, expireAt = params.expireAt;
                    return [4 /*yield*/, getQiniuUploadInfo(context)];
                case 1:
                    config = _a.sent();
                    return [4 /*yield*/, getStreamObj(config, streamTitle, expireAt)];
                case 2:
                    livestream = _a.sent();
                    return [2 /*return*/, livestream];
            }
        });
    });
}
exports.getLivestream2 = getLivestream2;
function getStreamObj(config, streamTitle, expireAt) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var hub, publishDomain, rtmpPlayDomain, publishKey, playKey, signStr, sourcePath, token, rtmpPushUrl, t, playSign, rtmpPlayUrl, pcPushUrl, streamKey;
        return tslib_1.__generator(this, function (_a) {
            hub = config.hub, publishDomain = config.publishDomain, rtmpPlayDomain = config.rtmpPlayDomain, publishKey = config.publishKey, playKey = config.playKey;
            signStr = "/".concat(hub, "/").concat(streamTitle, "?expire=").concat(expireAt);
            sourcePath = "/".concat(hub, "/").concat(streamTitle);
            token = (0, sign_1.base64ToUrlSafe)((0, sign_1.hmacSha1)(signStr, publishKey));
            rtmpPushUrl = "rtmp://".concat(publishDomain).concat(signStr, "&token=").concat(token);
            t = expireAt.toString(16).toLowerCase();
            playSign = ts_md5_1.Md5.hashStr(playKey + sourcePath + t).toString().toLowerCase();
            rtmpPlayUrl = "rtmp://".concat(rtmpPlayDomain).concat(sourcePath, "?sign=").concat(playSign, "&t=").concat(t);
            pcPushUrl = "rtmp://".concat(publishDomain, "/").concat(hub, "/");
            streamKey = "".concat(streamTitle, "?expire=").concat(expireAt, "&token=").concat(token);
            return [2 /*return*/, {
                    streamTitle: streamTitle,
                    hub: hub,
                    rtmpPushUrl: rtmpPushUrl,
                    rtmpPlayUrl: rtmpPlayUrl,
                    pcPushUrl: pcPushUrl,
                    streamKey: streamKey,
                    expireAt: expireAt,
                }];
        });
    });
}
