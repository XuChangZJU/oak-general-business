import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Button, Space } from 'antd';
import OnUser from '../onUser/index';
export default function Render(props) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return (_jsxs(_Fragment, { children: [_jsx(OnUser, { oakAutoUnmount: true, oakPath: `${oakFullpath}.user`, entity: entity, entityId: entityId, relations: relations, oakId: oakId }), _jsx(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { disabled: !oakDirty, type: "primary", onClick: () => onConfirm(), children: t('common::action.confirm') }), _jsx(Button, { htmlType: "reset", onClick: () => onReset(), children: t('common::reset') })] }) }) })] }));
}
