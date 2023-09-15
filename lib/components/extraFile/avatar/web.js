"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { style, className, avatarUrl } = props.data;
    const { onPickByWeb } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { id: "input-for-upload", accept: "image/*", className: web_module_less_1.default.input, onChange: (evt) => {
                    const { files } = evt.currentTarget;
                    onPickByWeb(Object.values(files));
                    //evt.target.value = null;
                }, type: "file" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "input-for-upload", children: avatarUrl ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: 64, src: avatarUrl })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: 64, icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}) })) })] }));
}
exports.default = render;
