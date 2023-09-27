"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { oakId, folder, name, description, 'super': isSuper } = props.data;
    const { t } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { column: 1, bordered: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: "id", children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, { copyable: true, children: oakId }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.name'), children: name }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.description'), children: description }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.super'), children: isSuper ? '是' : '否' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('system:attr.folder'), children: folder })] }));
}
exports.default = Render;
