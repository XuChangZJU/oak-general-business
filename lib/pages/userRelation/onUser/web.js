"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
function render() {
    var _this = this;
    var t = this.t;
    var _a = this.props, entity = _a.entity, relations = _a.relations;
    var _b = this.state, searchValue = _b.searchValue, users = _b.users, oakDirty = _b.oakDirty;
    var relations2 = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: { height: '100vh' } }, { children: [(0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Search, { focus: false, placeholder: "\u8BF7\u8F93\u5165", value: searchValue || '', onChange: this.searchValueChange, action: "\u53D6\u6D88", onActionClick: function () {
                    _this.searchCancel();
                }, onSubmit: function (value, event) {
                    // value清空
                    _this.searchConfirm();
                }, onClear: function () {
                    _this.searchCancel();
                }, leftIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.SearchIcon, {}) }), users === null || users === void 0 ? void 0 : users.map(function (ele, index) {
                return ((0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: ele.nickname || '未设置', image: (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Image, { src: ele.avatar, alt: "\u5934\u50CF", style: { width: 80, height: 80 } }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "description" }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "name" }, { children: ["\u59D3\u540D: ", ele.name || '未设置'] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "mobile" }, { children: ["\u624B\u673A: ", ele.mobile || '未设置'] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "relation" }, { children: relations2 === null || relations2 === void 0 ? void 0 : relations2.map(function (relation, index2) { return ((0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Switch, { defaultValue: ele.hasRelation[index2], label: [
                                        t(entity + ':r.' + relation),
                                        t(entity + ':r.' + relation),
                                    ], onChange: function (value) {
                                        _this.onChangeValue(value, relation, index);
                                    } }, index2)); }) }))] })) }, index));
            }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Button, tslib_1.__assign({ theme: "primary", block: true, disabled: !oakDirty, onClick: function () {
                    _this.confirm();
                } }, { children: "\u786E\u5B9A" }))] })));
}
exports.default = render;
