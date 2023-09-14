"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../components/common/pageHeader"));
var changePassword_1 = tslib_1.__importDefault(require("../../components/changePassword"));
function render(props) {
    var _a = props.data, showBack = _a.showBack, userId = _a.userId, currentUserId = _a.currentUserId;
    return ((userId || currentUserId) ? (0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: showBack, title: "\u5BC6\u7801\u8BBE\u7F6E", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(changePassword_1.default, { oakId: userId || currentUserId, oakPath: "$changePassword-component", oakAutoUnmount: true }) }) }) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
}
exports.default = render;
