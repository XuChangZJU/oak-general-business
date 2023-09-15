"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const index_1 = tslib_1.__importDefault(require("../onUser/index"));
function Render(props) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(index_1.default, { oakAutoUnmount: true, oakPath: oakFullpath && `${oakFullpath}.user`, entity: entity, entityId: entityId, relations: relations, oakId: oakId }), (0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: !oakDirty, type: "primary", onClick: () => onConfirm(), children: t('common::action.confirm') }), (0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", onClick: () => onReset(), children: t('common::reset') })] }) }) })] }));
}
exports.default = Render;
