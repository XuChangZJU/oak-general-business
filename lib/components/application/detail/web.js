"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const upsert_1 = tslib_1.__importDefault(require("../upsert"));
function Render(props) {
    const { id, name, description, type, oakFullpath, oakExecutable, oakExecuting } = props.data;
    const { t, clean, execute } = props.methods;
    const [open, setOpen] = (0, react_1.useState)(false);
    if (id && oakFullpath) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { open: open, width: 800, onCancel: () => {
                        clean();
                        setOpen(false);
                    }, footer: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: async () => {
                            await execute();
                            setOpen(false);
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: (0, jsx_runtime_1.jsx)(upsert_1.default, { oakPath: oakFullpath, oakId: id }) }), (0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { column: 2, bordered: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: "id", children: (0, jsx_runtime_1.jsx)(antd_1.Typography.Paragraph, { copyable: true, children: id }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.name'), children: name }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.description'), children: description }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('application:attr.type'), children: t(`application:v.type.${type}`) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { span: 2, children: (0, jsx_runtime_1.jsx)(antd_1.Row, { justify: "end", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => setOpen(true), children: t('common::action.update') }) }) })] })] }));
    }
}
exports.default = Render;
