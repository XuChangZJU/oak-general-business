import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, Modal, Button } from 'antd';
import ApplicationPanel from '../../application/panel';
import ApplicationUpsert from '../../application/upsert';
export default function render(props) {
    const { oakFullpath, applications, oakExecutable, oakExecuting, systemId } = props.data;
    const { addItem, removeItem, clean, execute, t } = props.methods;
    const [createId, setCreateId] = useState('');
    const [removeId, setRemoveId] = useState('');
    if (oakFullpath) {
        return (_jsxs(_Fragment, { children: [_jsx(Modal, { open: !!createId, width: 800, onCancel: () => {
                        clean();
                        setCreateId('');
                    }, footer: _jsx(Button, { type: 'primary', onClick: async () => {
                            await execute();
                            setCreateId('');
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: _jsx(ApplicationUpsert, { oakId: createId, oakPath: `${oakFullpath}.${createId}` }) }), _jsx(Modal, { open: !!removeId, onCancel: () => {
                        clean();
                        setRemoveId('');
                    }, footer: _jsx(Button, { type: 'primary', onClick: async () => {
                            removeItem(removeId);
                            await execute();
                            setRemoveId('');
                        }, children: t('common::action.confirm') }), children: t('confirmToRemove') }), _jsx(Tabs, { type: "editable-card", onEdit: (key, action) => {
                        if (action === 'add') {
                            const id = addItem({ systemId });
                            setCreateId(id);
                        }
                        else if (action === 'remove') {
                            const appId = applications[Number(key)].id;
                            setRemoveId(appId);
                        }
                    }, items: applications?.length > 0 ?
                        applications.map((item, idx) => {
                            return {
                                label: item.name,
                                key: `${idx}`,
                                children: (_jsx(ApplicationPanel, { oakPath: `${oakFullpath}.${item.id}`, oakId: item.id }))
                            };
                        })
                        : [] })] }));
    }
}
