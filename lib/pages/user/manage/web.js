"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const icons_1 = require("@ant-design/icons");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    const { stateColor, userArr, isRoot } = props.data;
    const { onCellClicked, t, goNewUser } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List, { children: userArr?.map((ele, index) => {
                    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: () => onCellClicked(ele.id), prefix: (0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { className: mobile_module_less_1.default.avatar, src: ele.avatar }), title: (0, jsx_runtime_1.jsx)("div", { children: ele.name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.description, children: [(0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.row, children: [(0, jsx_runtime_1.jsx)("span", { className: mobile_module_less_1.default.label, children: "\u6635\u79F0:\u00A0" }), (0, jsx_runtime_1.jsx)("span", { className: mobile_module_less_1.default.value, children: ele.nickname || '--' })] }), (0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.row, children: [(0, jsx_runtime_1.jsx)("span", { className: mobile_module_less_1.default.label, children: "\u624B\u673A\u53F7:\u00A0" }), (0, jsx_runtime_1.jsx)("span", { className: mobile_module_less_1.default.value, children: ele.mobile || '--' })] }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: stateColor[ele.userState], children: ele.userState
                                        ? t(`user:v.userState.${ele.userState}`)
                                        : '未知' })] }) }, index));
                }) }), isRoot && ((0, jsx_runtime_1.jsx)(antd_mobile_1.FloatingBubble, { axis: "x", magnetic: "x", style: {
                    '--initial-position-bottom': '24px',
                    '--initial-position-right': '24px',
                    '--edge-distance': '24px',
                }, onClick: () => {
                    goNewUser();
                }, children: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}) }))] }));
}
exports.default = render;
