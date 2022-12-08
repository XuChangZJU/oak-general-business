"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    isList: false,
    formData: function (_a) {
        var props = _a.props;
        var data = this.consumeMessage();
        if (process.env.OAK_PLATFORM === 'wechatMp') {
            if (data) {
                // lin-ui的message: https://doc.mini.talelin.com/component/response/message.html
                wx.lin.showMessage({
                    type: data.type === 'info'
                        ? 'primary'
                        : data.type || 'primary',
                    content: data.content,
                    icon: data.icon,
                    duration: data.duration,
                });
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
