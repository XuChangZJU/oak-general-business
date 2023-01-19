"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var endpoints = {
    wechatApi: {
        name: '微信公众号回调接口',
        method: 'post',
        params: ['appId'],
        fn: function (context, params, body, headers) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var appId;
            return tslib_1.__generator(this, function (_a) {
                appId = params.appId;
                throw new Error('not implemented yet');
            });
        }); },
    }
};
exports.default = endpoints;
