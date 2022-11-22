"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var message_1 = tslib_1.__importDefault(require("../../utils/message"));
exports.default = OakComponent({
    isList: false,
    formData: function (_a) {
        var props = _a.props;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var width, data, self_1;
            return tslib_1.__generator(this, function (_b) {
                width = props.width;
                data = this.consumeMessage();
                if (data) {
                    self_1 = this;
                    message_1.default[data.type](Object.assign({}, process.env.OAK_PLATFORM === 'wechatMp' && {
                        // 处理小程序
                        offset: [20, 32],
                        icon: true,
                        context: self_1,
                    }, data));
                }
                return [2 /*return*/, {}];
            });
        });
    },
    lifetimes: {
        attached: function () {
            var _this = this;
            this.subscribed.push(this.features.message.subscribe(function () { return _this.reRender(); }));
        }
    }
});
