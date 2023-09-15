"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { data: { areas }, methods: { onItemClicked, t } } = props;
    if (areas && areas.length > 0) {
        return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List, { children: areas.map((area) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { onClick: () => onItemClicked(area), arrow: true, children: area.name }, area.id))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: t('common::noData') }));
}
exports.default = render;
