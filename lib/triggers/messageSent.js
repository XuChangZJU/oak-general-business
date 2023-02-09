"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
function sendMessage(messageSentData, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
var triggers = [
    {
        name: '当创建messageSent后，业务提交后再进行推送',
        entity: 'messageSent',
        action: 'create',
        when: 'commit',
        strict: 'makeSure',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, fn;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            fn = function (messageSentData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sendMessage(messageSentData, context)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!(data instanceof Array)) return [3 /*break*/, 1];
                            (0, assert_1.assert)('不存在一对多的情况');
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, fn(data)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3: return [2 /*return*/, 0];
                    }
                });
            });
        }
    },
];
exports.default = triggers;
