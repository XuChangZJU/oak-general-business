"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComponent = void 0;
var tslib_1 = require("tslib");
var page_web_1 = require("oak-frontend-base/lib/page.web");
function createComponent(option, features) {
    var lifetimes = option.lifetimes, rest = tslib_1.__rest(option, ["lifetimes"]);
    var _a = lifetimes || {}, attached = _a.attached, restLifeTimes = tslib_1.__rest(_a, ["attached"]);
    return (0, page_web_1.createComponent)(tslib_1.__assign({ lifetimes: tslib_1.__assign({ attached: function () {
                var _this = this;
                this.subscribed.push(this.features.token.subscribe(function () { return _this.refresh(); }));
                attached && attached.call(this);
            } }, restLifeTimes) }, rest), features);
}
exports.createComponent = createComponent;
