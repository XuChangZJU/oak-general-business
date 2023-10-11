import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Row, Descriptions, Typography, Button, Modal } from 'antd';
import ApplicationUpsert from '../upsert';
export default function Render(props) {
    const { id, name, description, type, oakFullpath, oakExecutable, oakExecuting } = props.data;
    const { t, clean, execute } = props.methods;
    const [open, setOpen] = useState(false);
    if (id && oakFullpath) {
        return (_jsxs(_Fragment, { children: [_jsx(Modal, { open: open, width: 800, onCancel: () => {
                        clean();
                        setOpen(false);
                    }, footer: _jsx(Button, { type: "primary", onClick: async () => {
                            await execute();
                            setOpen(false);
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: _jsx(ApplicationUpsert, { oakPath: oakFullpath, oakId: id }) }), _jsxs(Descriptions, { column: 2, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: id }) }), _jsx(Descriptions.Item, { label: t('application:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('application:attr.description'), children: description }), _jsx(Descriptions.Item, { label: t('application:attr.type'), children: t(`application:v.type.${type}`) }), _jsx(Descriptions.Item, { span: 2, children: _jsx(Row, { justify: "end", children: _jsx(Button, { type: "primary", onClick: () => setOpen(true), children: t('common::action.update') }) }) })] })] }));
    }
}
