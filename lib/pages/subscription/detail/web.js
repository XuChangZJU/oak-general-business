"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { oakId, tabValue, config, name, description, entity, entityId } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { showBack: true, title: "\u8BA2\u9605\u53F7\u6982\u89C8", children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(antd_1.Card, { title: name, bordered: false, children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: [
                        {
                            label: '订阅号概览',
                            key: 'detail',
                            children: ((0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { column: 1, bordered: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: "id", children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, { copyable: true, children: oakId }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('subscription:attr.name'), children: name }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('subscription:attr.description'), children: description })] })),
                        },
                    ] }) }) }) }));
}
exports.default = Render;
