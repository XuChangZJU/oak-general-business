"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const byMobile_1 = tslib_1.__importDefault(require("./byMobile"));
const byPassword_1 = tslib_1.__importDefault(require("./byPassword"));
function Render(props) {
    const { data, methods } = props;
    const { channels, user, oakFullpath, oakId } = data;
    const { goToMobile } = methods;
    const items = [
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
        return (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["\u8BF7\u60A8\u5148", (0, jsx_runtime_1.jsx)("div", { style: {
                            color: 'blue',
                            display: 'inline',
                            textDecoration: 'underline'
                        }, onClick: () => goToMobile(), children: "\u70B9\u6B64\u7ED1\u5B9A\u624B\u673A\u53F7" }), "\u518D\u8FDB\u884C\u5BC6\u7801\u4FEE\u6539"] }), type: "info" });
    }
    return ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items.filter((ele) => channels.includes(ele.key)) }));
}
exports.default = Render;
