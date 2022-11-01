"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var randomUser_1 = require("../../../utils/randomUser");
function render() {
    var _this = this;
    var t = this.t;
    var _a = this.props, entity = _a.entity, relations = _a.relations;
    var _b = this.state, searchValue = _b.searchValue, users = _b.users, oakDirty = _b.oakDirty;
    var relations2 = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.List, { children: users === null || users === void 0 ? void 0 : users.map(function (ele, index) {
                    return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: ele.avatar ? ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { className: web_module_less_1.default.avatar, src: ele.avatar })) : ((0, jsx_runtime_1.jsx)(antd_1.Avatar, tslib_1.__assign({ className: web_module_less_1.default.avatar }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.text }, { children: (0, randomUser_1.getName)(ele.name) })) }))), title: (0, jsx_runtime_1.jsx)("div", { children: ele.name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.description }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.label }, { children: "\u6635\u79F0:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.value }, { children: ele.nickname || '--' }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.label }, { children: "\u624B\u673A\u53F7:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.value }, { children: ele.mobile || '--' }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "relation" }, { children: relations2 === null || relations2 === void 0 ? void 0 : relations2.map(function (relation, index2) { return ((0, jsx_runtime_1.jsx)(antd_1.Switch, { checked: ele.hasRelation[index2], checkedChildren: [
                                                t(entity +
                                                    ':r.' +
                                                    relation),
                                                t(entity +
                                                    ':r.' +
                                                    relation),
                                            ], onChange: function (value) {
                                                _this.onChangeValue(value, relation, index);
                                            } }, index2)); }) }))] })) }, index) }));
                }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", block: true, disabled: !oakDirty, onClick: function () {
                    _this.confirm();
                } }, { children: "\u786E\u5B9A" }))] })));
}
exports.default = render;
