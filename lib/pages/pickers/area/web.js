"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var ListItem = tdesign_react_1.List.ListItem;
function render() {
    var _this = this;
    var arealist = this.state.arealist;
    if ((arealist === null || arealist === void 0 ? void 0 : arealist.length) > 0) {
        return ((0, jsx_runtime_1.jsx)(tdesign_react_1.List, { children: arealist.map(function (area) { return ((0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ block: true, theme: "default", variant: "text", onClick: function () { return _this.onItemClicked(area); } }, { children: (0, jsx_runtime_1.jsxs)(ListItem, { children: [area.name, (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.ChevronRightIcon, {})] }, area.id) }))); }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: this.t('common:noData') })));
}
exports.default = render;
