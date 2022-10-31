"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var randomUser_1 = require("../../../utils/randomUser");
function render() {
    var _this = this;
    var t = this.t;
    var entity = this.props.entity;
    var users = this.state.users;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.List, { children: users === null || users === void 0 ? void 0 : users.map(function (ele, index) {
                    var _a;
                    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function (e) { return _this.goDetail(ele.id); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: ele.avatar ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: mobile_module_less_1.default.avatar, src: ele.avatar })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, tslib_1.__assign({ className: mobile_module_less_1.default.avatar }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.text }, { children: (0, randomUser_1.getName)(ele.name) })) }))), title: (0, jsx_runtime_1.jsx)("div", { children: ele.name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.description }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.label }, { children: "\u6635\u79F0:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.value }, { children: ele.nickname || '--' }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.label }, { children: "\u624B\u673A\u53F7:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: mobile_module_less_1.default.value }, { children: ele.mobile || '--' }))] })), (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (_a = ele.relations) === null || _a === void 0 ? void 0 : _a.map(function (relation, index) { return ((0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: "processing" }, { children: t("".concat(entity, ":r.").concat(relation)) }), index)); }) })] })) }) }) }), index));
                }) }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.fab }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", shape: "circle", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), onClick: function () {
                        _this.goUpsert();
                    } }) }))] })));
}
exports.default = render;
