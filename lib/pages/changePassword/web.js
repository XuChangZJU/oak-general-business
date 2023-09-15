"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const changePassword_1 = tslib_1.__importDefault(require("../../components/changePassword"));
function render(props) {
    const { showBack, userId, currentUserId } = props.data;
    return ((userId || currentUserId) ? (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(changePassword_1.default, { oakId: userId || currentUserId, oakPath: "$changePassword-component", oakAutoUnmount: true }) }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = render;
