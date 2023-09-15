"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const list_1 = tslib_1.__importDefault(require("../../system/list"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { oakId, config, name, tabValue, description } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u5E73\u53F0\u6982\u89C8", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Card, { title: name, bordered: false, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { activeKey: tabValue, onTabClick: (key) => {
                        onTabClick(key);
                    }, items: [
                        {
                            label: '平台信息',
                            key: 'detail',
                            children: ((0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { column: 1, bordered: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: "id", children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, { copyable: true, children: oakId }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('platform:attr.name'), children: name }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('platform:attr.description'), children: description })] })),
                        },
                        {
                            label: '系统管理',
                            key: 'system_list',
                            children: ((0, jsx_runtime_1.jsx)(list_1.default, { platformId: oakId, oakPath: "$platform/detail/-system/list", oakAutoUnmount: true })),
                        },
                    ] }) }) }) }));
}
exports.default = Render;
