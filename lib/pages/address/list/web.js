"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var tdesign_react_1 = require("tdesign-react");
var ListItem = tdesign_react_1.List.ListItem, ListItemMeta = tdesign_react_1.List.ListItemMeta;
function render() {
    var _this = this;
    var addresses = this.state.addresses;
    if ((addresses === null || addresses === void 0 ? void 0 : addresses.length) > 0) {
        return ((0, jsx_runtime_1.jsx)(tdesign_react_1.List, { children: addresses.map(function (address) { return ((0, jsx_runtime_1.jsx)(ListItem, { children: (0, jsx_runtime_1.jsx)(ListItemMeta, { title: address.name, description: address.areaText + address.detail }) }, address.id)); }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [this.t('common:noData'), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ block: false, ghost: false, loading: false, shape: "rectangle", size: "medium", type: "button", variant: "base", style: { marginTop: 10 }, onClick: function () { return _this.goNewAddress(); } }, { children: this.t('common:action.create') }))] })));
}
exports.default = render;
