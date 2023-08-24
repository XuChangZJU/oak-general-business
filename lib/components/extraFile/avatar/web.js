"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, style = _a.style, className = _a.className, avatarUrl = _a.avatarUrl;
    var onPickByWeb = props.methods.onPickByWeb;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { id: "input-for-upload", accept: "image/*", className: web_module_less_1.default.input, onChange: function (evt) {
                    var files = evt.currentTarget.files;
                    onPickByWeb(Object.values(files));
                    //evt.target.value = null;
                }, type: "file" }), (0, jsx_runtime_1.jsx)("label", tslib_1.__assign({ htmlFor: "input-for-upload" }, { children: avatarUrl ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: 64, src: avatarUrl })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { size: 64, icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}) })) }))] }));
}
exports.default = render;
