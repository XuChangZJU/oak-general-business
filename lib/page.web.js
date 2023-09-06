"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
var tslib_1 = require("tslib");
var page_web_1 = require("oak-frontend-base/es/page.web");
function createComponent(option, features) {
    var lifetimes = option.lifetimes, methods = option.methods, rest = tslib_1.__rest(option, ["lifetimes", "methods"]);
    var _a = lifetimes || {}, attached = _a.attached, restLifeTimes = tslib_1.__rest(_a, ["attached"]);
    return (0, page_web_1.createComponent)(tslib_1.__assign({ methods: tslib_1.__assign({ subscribeMpMessage: function (messageTypes, haveToAccept, tip) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        throw new Error('小程序环境专有函数在web下不成立');
                    });
                });
            } }, methods), lifetimes: tslib_1.__assign({ attached: function () {
                var _this = this;
                this.subscribed.push(this.features.token.subscribe(function () { return _this.refresh(); }));
                attached && attached.call(this);
            } }, restLifeTimes) }, rest), features);
}
exports.createComponent = createComponent;
