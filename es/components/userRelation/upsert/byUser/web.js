import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Button, Space } from 'antd-mobile';
import OnUser from '../onUser/index';
export default function Render(props) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath, oakExecutable } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return (_jsx(Form, { footer: _jsxs(Space, { children: [_jsx(Button, { color: "primary", style: { flex: 2 }, onClick: () => {
                        onConfirm();
                    }, disabled: oakExecutable !== true, children: t('common::action.confirm') }), _jsx(Button, { style: { flex: 1 }, onClick: () => onReset(), children: t('common::reset') })] }), children: _jsx(OnUser, { oakAutoUnmount: true, oakPath: oakFullpath && `${oakFullpath}.user`, entity: entity, entityId: entityId, relations: relations, oakId: oakId }) }));
}
