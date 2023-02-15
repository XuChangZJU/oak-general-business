"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = exports.executeMpAfterSubscribeMessage = void 0;
var tslib_1 = require("tslib");
var page_mp_1 = require("oak-frontend-base/lib/page.mp");
var Exception_1 = require("./types/Exception");
/**
 * 这里的逻辑暴露出去，是为了让general可以被其它库重载
 * @param this
 * @param messageTypes
 * @param haveToAccept
 * @param action
 * @param messageProps
 * @returns
 */
function executeMpAfterSubscribeMessage(messageTypes, haveToAccept, action, messageProps) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mttIds, tmplIds, result_1, rejected;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mttIds = this.features.cache.get('messageTypeTemplateId', {
                        data: {
                            id: 1,
                            templateId: 1,
                            type: 1,
                        },
                        filter: {
                            type: {
                                $in: messageTypes,
                            },
                        },
                    });
                    if (!(mttIds.length > 0)) return [3 /*break*/, 2];
                    tmplIds = mttIds.map(function (ele) { return ele.templateId; });
                    return [4 /*yield*/, wx.requestSubscribeMessage({
                            tmplIds: tmplIds
                        })];
                case 1:
                    result_1 = _a.sent();
                    rejected = Object.keys(result_1).filter(function (ele) {
                        if (result_1[ele] === 'reject') {
                            return true;
                        }
                        else if (result_1[ele] !== 'accept') {
                            _this.setMessage({
                                type: 'warning',
                                content: "\u7C7B\u578B".concat(ele, "\u7684\u6A21\u677F\u6D88\u606F\u88AB").concat(result_1[ele], "\uFF0C\u8BF7\u7BA1\u7406\u5458\u67E5\u770B\u540E\u53F0"),
                            });
                        }
                    });
                    if (rejected.length > 0 && haveToAccept) {
                        throw new Exception_1.OakMpHaveToSubscribeMessage(rejected);
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/, this.execute(action, messageProps)];
            }
        });
    });
}
exports.executeMpAfterSubscribeMessage = executeMpAfterSubscribeMessage;
function createComponent(option, features) {
    var wechatMp = option.wechatMp, methods = option.methods, lifetimes = option.lifetimes, rest = tslib_1.__rest(option, ["wechatMp", "methods", "lifetimes"]);
    var relatedMessageTypes = (wechatMp || {}).relatedMessageTypes;
    var _a = lifetimes || {}, ready = _a.ready, restLifeTimes = tslib_1.__rest(_a, ["ready"]);
    return (0, page_mp_1.createComponent)(tslib_1.__assign({ methods: tslib_1.__assign({ executeMpAfterSubscribeMessage: function (messageTypes, haveToAccept, action, messageProps) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, executeMpAfterSubscribeMessage.call(this, messageTypes, haveToAccept, action, messageProps)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            } }, methods), lifetimes: tslib_1.__assign({ ready: function () {
                if (relatedMessageTypes) {
                    var applicationId = this.features.application.getApplicationId();
                    this.features.cache.refresh('messageTypeTemplateId', {
                        data: {
                            id: 1,
                            templateId: 1,
                            type: 1,
                        },
                        filter: {
                            type: {
                                $in: relatedMessageTypes,
                            },
                            applicationId: applicationId,
                        },
                    });
                }
                ready && ready.call(this);
            } }, restLifeTimes), wechatMp: wechatMp }, rest), features);
}
exports.createComponent = createComponent;
