import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import Style from './web.module.less';
import OnUser from '../onUser/index';
export default function Render(props) {
    const { mobileValue, mobileValueReady, relations, entity, entityId, userId, oakFullpath, oakExecutable, legal, isNew } = props.data;
    const { onConfirm, onMobileChange, onReset, t } = props.methods;
    const [passwordConfirm, setPasswordConfirm] = useState(true);
    return (_jsxs("div", { className: Style.container, children: [_jsx(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: _jsx(Form.Item, { label: "\u624B\u673A\u53F7\u7801", required: true, 
                    // name="mobile"
                    rules: [
                        {
                            message: '手机号不能为空',
                        },
                        {
                            min: 11,
                            message: '请输入11位手机号',
                        },
                        {
                            max: 11,
                            message: '请输入11位手机号',
                        },
                    ], children: _jsx(Input, { maxLength: 11, value: mobileValue, onChange: (e) => {
                            const strValue = e.target.value;
                            onMobileChange(strValue);
                        }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801", type: "tel" }) }) }), mobileValueReady && userId && (_jsx(OnUser, { oakAutoUnmount: true, oakPath: oakFullpath ? `${oakFullpath}.user` : undefined, entity: entity, entityId: entityId, relations: relations, oakId: userId, setPasswordConfirm: setPasswordConfirm })), _jsx(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { style: { flex: 2 }, type: "primary", htmlType: "reset", onClick: async () => {
                                    await onConfirm();
                                    setPasswordConfirm(true);
                                }, disabled: !legal ||
                                    !oakExecutable ||
                                    (isNew && !passwordConfirm), children: t('common::action.confirm') }), _jsx(Button, { htmlType: "reset", onClick: () => onReset(), style: { flex: 1 }, children: t('common::reset') })] }) }) })] }));
}
