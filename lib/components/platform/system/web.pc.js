"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const panel_1 = tslib_1.__importDefault(require("../../system/panel"));
const upsert_1 = tslib_1.__importDefault(require("../../system/upsert"));
function render(props) {
    const { oakFullpath, systems, oakExecutable, oakExecuting, platformId } = props.data;
    const { addItem, removeItem, clean, execute, t } = props.methods;
    const [createId, setCreateId] = (0, react_1.useState)('');
    const [removeId, setRemoveId] = (0, react_1.useState)('');
    if (oakFullpath) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { open: !!createId, width: 800, onCancel: () => {
                        clean();
                        setCreateId('');
                    }, footer: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: async () => {
                            await execute();
                            setCreateId('');
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: (0, jsx_runtime_1.jsx)(upsert_1.default, { oakId: createId, oakPath: `${oakFullpath}.${createId}` }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: !!removeId, onCancel: () => {
                        clean();
                        setRemoveId('');
                    }, footer: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: async () => {
                            removeItem(removeId);
                            await execute();
                            setRemoveId('');
                        }, children: t('common::action.confirm') }), children: t('confirmToRemove') }), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { type: "editable-card", onEdit: (key, action) => {
                        if (action === 'add') {
                            const id = addItem({ platformId, config: { App: {} } });
                            setCreateId(id);
                        }
                        else if (action === 'remove') {
                            const systemId = systems[Number(key)].id;
                            setRemoveId(systemId);
                        }
                    }, items: systems?.length > 0 ?
                        systems.map((item, idx) => {
                            return {
                                label: item.name,
                                key: `${idx}`,
                                children: ((0, jsx_runtime_1.jsx)(panel_1.default, { oakPath: `${oakFullpath}.${item.id}`, oakId: item.id }))
                            };
                        })
                        : [] })] }));
    }
}
exports.default = render;
