import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Descriptions, Typography, Modal, Button, Row } from 'antd';
import PlatformUpsert from '../upsert';
export default function Render(props) {
    const { oakId, name, description, oakExecutable, oakExecuting, oakFullpath } = props.data;
    const { t, execute, clean } = props.methods;
    const [open, setOpen] = useState(false);
    if (oakFullpath) {
        return (_jsxs(_Fragment, { children: [_jsx(Modal, { open: open, onCancel: () => {
                        clean();
                        setOpen(false);
                    }, width: 800, footer: _jsx(Button, { type: 'primary', onClick: async () => {
                            await execute();
                            setOpen(false);
                        }, disabled: oakExecutable !== true || oakExecuting, children: t('common::action.confirm') }), children: _jsx(PlatformUpsert, { oakId: oakId, oakPath: oakFullpath }) }), _jsxs(Descriptions, { column: 2, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('platform:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('platform:attr.description'), children: description }), _jsx(Descriptions.Item, { children: _jsx(Row, { justify: "end", children: _jsx(Button, { type: "primary", onClick: () => setOpen(true), children: t('common::action.update') }) }) })] })] }));
    }
    return null;
}
