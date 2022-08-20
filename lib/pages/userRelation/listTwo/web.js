"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var CustomTag = tdesign_mobile_react_1.Tag;
function render() {
    var _this = this;
    var t = this.t;
    var entity = this.props.entity;
    var users = this.state.users;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ style: {
            height: '100vh',
        } }, { children: [users === null || users === void 0 ? void 0 : users.map(function (ele, index) {
                var _a;
                return ((0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { onClick: function (e) { return _this.goDetail(ele.id); }, title: ele.nickname || '未设置', image: (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Image, { src: ele.avatar, alt: "\u5934\u50CF", style: { width: 80, height: 80 } }), description: (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "description" }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "name" }, { children: ["\u59D3\u540D: ", ele.name || '未设置'] })), (0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "mobile" }, { children: ["\u624B\u673A: ", ele.mobile || '未设置'] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: "relation" }, { children: (_a = ele.relations) === null || _a === void 0 ? void 0 : _a.map(function (relation, index) { return ((0, jsx_runtime_1.jsx)(CustomTag, tslib_1.__assign({ variant: "outline", theme: "primary", className: "", style: {} }, { children: t("".concat(entity, ":r.").concat(relation)) }), index)); }) }))] })) }, index));
            }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Fab, { buttonProps: {
                    theme: 'primary',
                    shape: 'circle',
                    size: 'large',
                }, icon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "add" }), style: { right: '16px', bottom: '32px' }, onClick: function () {
                    _this.goUpsert();
                } })] })));
}
exports.default = render;
