"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var randomUser_1 = require("../../../utils/randomUser");
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _this = this;
    var t = this.t;
    var _a = this.props, entity = _a.entity, relations = _a.relations;
    var _b = this.state, searchValue = _b.searchValue, users = _b.users, oakDirty = _b.oakDirty;
    var relations2 = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.List, { children: users === null || users === void 0 ? void 0 : users.map(function (ele, index) {
                    return ((0, jsx_runtime_1.jsx)(ListItem, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { image: ele.avatar ? ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, { className: web_module_less_1.default.avatar, image: ele.avatar })) : ((0, jsx_runtime_1.jsx)(tdesign_react_1.Avatar, tslib_1.__assign({ className: web_module_less_1.default.avatar }, { children: (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.text }, { children: (0, randomUser_1.getName)(ele.name) })) }))), title: (0, jsx_runtime_1.jsx)("div", { children: ele.name || '--' }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.description }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.label }, { children: "\u6635\u79F0:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.value }, { children: ele.nickname || '--' }))] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.row }, { children: [(0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.label }, { children: "\u624B\u673A\u53F7:\u00A0" })), (0, jsx_runtime_1.jsx)("span", tslib_1.__assign({ className: web_module_less_1.default.value }, { children: ele.mobile || '--' }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "relation" }, { children: relations2 === null || relations2 === void 0 ? void 0 : relations2.map(function (relation, index2) { return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Switch, { defaultValue: ele.hasRelation[index2], label: [
                                                t(entity +
                                                    ':r.' +
                                                    relation),
                                                t(entity +
                                                    ':r.' +
                                                    relation),
                                            ], onChange: function (value) {
                                                _this.onChangeValue(value, relation, index);
                                            } }, index2)); }) }))] })) }, index) }));
                }) }), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ size: "large", theme: "primary", block: true, disabled: !oakDirty, onClick: function () {
                    _this.confirm();
                } }, { children: "\u786E\u5B9A" }))] })));
}
exports.default = render;
