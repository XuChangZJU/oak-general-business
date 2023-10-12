"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const antd_1 = require("antd");
const subscribedList_1 = tslib_1.__importDefault(require("./subscribedList"));
function Render(props) {
    const { oakFullpath, applicationId } = props.data;
    const {} = props.methods;
    const items = [
        {
            key: '1',
            label: '已关注',
            children: (0, jsx_runtime_1.jsx)(subscribedList_1.default, { oakAutoUnmount: true, applicationId: applicationId, oakPath: '$subscribedList' })
        },
    ];
    if (oakFullpath) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: items }) }));
    }
    return null;
}
exports.default = Render;
