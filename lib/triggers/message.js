"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDisperse = void 0;
var tslib_1 = require("tslib");
var assert_1 = require("oak-domain/lib/utils/assert");
exports.MessageDisperse = {
// [1]: {
//     conversationMessage: {
//         public: (message: CreateMessageData) => {
//             return message;
//         }
//     },
//     adminNotification: {
//         public: (message: CreateMessageData) => {
//             return message;
//         }
//     },
// },
// [10]: {
//     conversationMessage: {
//         public: (message: CreateMessageData) => {
//             return message;
//         }
//     },
//     adminNotification: {
//         public: (message: CreateMessageData) => {
//             return message;
//         }
//     },
// }
};
function tryAddMessageSent(message, channel, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            // const { systemId, type } = message;
            // const disperse = MessageDisperse && MessageDisperse[systemId] && MessageDisperse[systemId][type] && MessageDisperse[systemId][type][channel];
            // if (!disperse) {
            //     return 0;
            // }
            // // 有配置也未必一定能发，比如说用户没有注册手机号，则无法发gsm
            // const data = disperse(message);
            // if (!data) {
            //     return 0;
            // }
            // const messageSent = {
            //     messageId: message.id,
            //     iState: 'sending',
            //     channel,
            // };
            // await context.operate('messageSent', {
            //     id: await generateNewIdAsync(),
            //     action: 'create',
            //     data: {
            //         id: await generateNewId(),
            //         ...messageSent,
            //     } as EntityDict['messageSent']['OpSchema'],
            // }, {});
            return [2 /*return*/, 1];
        });
    });
}
function addMessageSent(message, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var weight, _a, result, count, result, count2, result, result;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    weight = message.weight;
                    _a = weight;
                    switch (_a) {
                        case 'high': return [3 /*break*/, 1];
                        case 'medium': return [3 /*break*/, 3];
                        case 'low': return [3 /*break*/, 10];
                        case 'data': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 14];
                case 1: return [4 /*yield*/, Promise.all([
                        tryAddMessageSent(message, 'public', context),
                        tryAddMessageSent(message, 'jPush', context),
                        tryAddMessageSent(message, 'jim', context),
                        tryAddMessageSent(message, 'mp', context),
                        tryAddMessageSent(message, 'gsm', context),
                    ])];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, result.reduce(function (a, b) { return a || b; })];
                case 3: return [4 /*yield*/, context.count('messageSent', {
                        filter: {
                            messageId: message.id,
                        }
                    }, {})];
                case 4:
                    count = _b.sent();
                    if (!(count < 1)) return [3 /*break*/, 8];
                    return [4 /*yield*/, Promise.all([
                            tryAddMessageSent(message, 'public', context),
                            tryAddMessageSent(message, 'jPush', context),
                            tryAddMessageSent(message, 'jim', context),
                            tryAddMessageSent(message, 'mp', context),
                        ])];
                case 5:
                    result = _b.sent();
                    count2 = result.reduce(function (a, b) { return a || b; });
                    if (!(count2 === 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, tryAddMessageSent(message, 'gsm', context)];
                case 6: return [2 /*return*/, _b.sent()];
                case 7: return [2 /*return*/, count2];
                case 8: return [4 /*yield*/, tryAddMessageSent(message, 'gsm', context)];
                case 9: return [2 /*return*/, _b.sent()];
                case 10: return [4 /*yield*/, Promise.all([
                        tryAddMessageSent(message, 'public', context),
                        tryAddMessageSent(message, 'jPush', context),
                        tryAddMessageSent(message, 'jim', context),
                        tryAddMessageSent(message, 'mp', context),
                    ])];
                case 11:
                    result = _b.sent();
                    return [2 /*return*/, result.reduce(function (a, b) { return a || b; })];
                case 12: return [4 /*yield*/, Promise.all([
                        tryAddMessageSent(message, 'jPush', context),
                        tryAddMessageSent(message, 'jim', context),
                    ])];
                case 13:
                    result = _b.sent();
                    return [2 /*return*/, result.reduce(function (a, b) { return a || b; })];
                case 14:
                    {
                        (0, assert_1.assert)(false);
                    }
                    _b.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    });
}
var triggers = [
    {
        name: '当创建message时，创建相应的messageSent',
        entity: 'message',
        action: 'create',
        when: 'before',
        fn: function (_a, context, params) {
            var operation = _a.operation;
            return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                var data, filter, fn;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = operation.data, filter = operation.filter;
                            fn = function (messageData) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, addMessageSent(messageData, context)];
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
