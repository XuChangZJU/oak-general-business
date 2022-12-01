"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var message_1 = tslib_1.__importDefault(require("../../utils/message"));
exports.default = OakComponent({
    isList: false,
    formData: function (_a) {
        var props = _a.props;
        var data = this.consumeMessage();
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            if (data) {
                var self_1 = this;
                message_1.default[data.type](Object.assign({
                    // 处理小程序
                    offset: [20, 32],
                    icon: true,
                    context: self_1,
                }, data));
            }
            return {};
        }
        return {
            data: data,
        };
    },
    lifetimes: {
        attached: function () {
            var _this = this;
            this.subscribed.push(this.features.message.subscribe(function () { return _this.reRender(); }));
        }
    }
});
