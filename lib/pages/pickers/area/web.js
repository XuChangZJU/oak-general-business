"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var areas = this.state.areas;
    if ((areas === null || areas === void 0 ? void 0 : areas.length) > 0) {
        return ((0, jsx_runtime_1.jsx)(antd_1.List, { children: areas.map(function (area) { return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ onClick: function () { return _this.onItemClicked(area); } }, { children: area.name }), area.id)); }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: this.t('common:noData') })));
}
exports.default = render;
