"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var areas = props.data.areas, _a = props.methods, onItemClicked = _a.onItemClicked, t = _a.t;
    if (areas && areas.length > 0) {
        return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List, { children: areas.map(function (area) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, tslib_1.__assign({ onClick: function () { return onItemClicked(area); }, arrow: true }, { children: area.name }), area.id)); }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: t('common:noData') })));
}
exports.default = render;
