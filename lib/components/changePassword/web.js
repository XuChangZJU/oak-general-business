"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var byMobile_1 = tslib_1.__importDefault(require("./byMobile"));
var byPassword_1 = tslib_1.__importDefault(require("./byPassword"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var channels = data.channels, user = data.user, oakFullpath = data.oakFullpath, oakId = data.oakId;
    var goToMobile = methods.goToMobile;
    var items = [
        {
            key: 'password',
            label: '原密码验证',
            children: (0, jsx_runtime_1.jsx)(byPassword_1.default, { oakId: oakId, oakPath: oakFullpath })
        },
        {
            key: 'mobile',
            label: '手机号验证',
            children: (0, jsx_runtime_1.jsx)(byMobile_1.default, { oakId: oakId, oakPath: oakFullpath })
        }
    ];
    if (channels.length === 0) {
        return (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u8BF7\u60A8\u5148", (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                            color: 'blue',
                            display: 'inline',
                            textDecoration: 'underline'
                        }, onClick: function () { return goToMobile(); } }, { children: "\u70B9\u6B64\u7ED1\u5B9A\u624B\u673A\u53F7" })), "\u518D\u8FDB\u884C\u5BC6\u7801\u4FEE\u6539"] }), type: "info" });
    }
    return ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items.filter(function (ele) { return channels.includes(ele.key); }) }));
}
exports.default = Render;
