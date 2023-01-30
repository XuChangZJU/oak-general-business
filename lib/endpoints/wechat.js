"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_1 = tslib_1.__importDefault(require("url"));
var sha1_1 = tslib_1.__importDefault(require("sha1"));
function assertFromWeChat(query, config) {
    var _a;
    var signature = query.signature, nonce = query.nonce, timestamp = query.timestamp;
    var token = (_a = config.server) === null || _a === void 0 ? void 0 : _a.token;
    var stringArray = [nonce, timestamp, token];
    var sign = stringArray.sort().reduce(function (acc, val) {
        acc += val;
        return acc;
    });
    var sha1Sign = (0, sha1_1.default)(sign);
    return signature === sha1Sign;
}
var endpoints = {
    wechatApi: {
        name: '微信公众号回调接口',
        method: 'post',
        params: ['appId'],
        fn: function (context, params, body, req, headers) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var appId;
            return tslib_1.__generator(this, function (_a) {
                appId = params.appId;
                throw new Error('not implemented yet');
            });
        }); },
    },
    wechatVerify: {
        name: '微信公众号验证接口',
        method: 'get',
        // params: ['applicationId'],
        fn: function (context, params, body, req, headers) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var query, applicationId, _a, application, isWeChat;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = url_1.default.parse(req.url, true, false).query;
                        applicationId = query.applicationId;
                        if (!applicationId) {
                            throw new Error('applicationId参数不存在');
                        }
                        return [4 /*yield*/, context.select('application', {
                                data: {
                                    id: 1,
                                    config: 1,
                                },
                                filter: {
                                    id: applicationId,
                                },
                            }, {})];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 1]), application = _a[0];
                        if (!application) {
                            throw new Error("\u672A\u627E\u5230".concat(applicationId, "\u5BF9\u5E94\u7684app"));
                        }
                        isWeChat = assertFromWeChat(query, application.config);
                        if (isWeChat) {
                            return [2 /*return*/, query.echostr];
                        }
                        else {
                            throw new Error('Verify Failed');
                        }
                        return [2 /*return*/];
                }
            });
        }); },
    }
};
exports.default = endpoints;
