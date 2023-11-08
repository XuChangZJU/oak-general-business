import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button } from 'antd-mobile';
import Style from './web.module.less';
import OnUser from '../onUser/index';
export default function Render(props) {
    const { mobileValue, mobileValueReady, relations, entity, entityId, userId, oakFullpath, oakExecutable, oakDirty } = props.data;
    const { onConfirm, onMobileChange, onReset, t } = props.methods;
    return (_jsxs(Form, { footer: _jsxs("div", { className: Style.btnContainer, children: [_jsx(Button, { color: "primary", style: { flex: 2 }, onClick: () => {
                        onConfirm();
                    }, disabled: !oakExecutable, children: t('common::action.confirm') }), _jsx(Button, { style: { flex: 1 }, onClick: () => onReset(), children: t('common::reset') })] }), children: [_jsx(Form.Item, { label: "\u624B\u673A\u53F7\u7801", name: "mobile", rules: [
                    {
                        required: true,
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
                ], children: _jsx(_Fragment, { children: _jsx(Input, { maxLength: 11, value: mobileValue, onChange: (value) => {
                            onMobileChange(value);
                        }, placeholder: t('inputMobile'), type: "tel", clearable: true }) }) }), mobileValueReady && userId && (_jsx(OnUser, { oakAutoUnmount: true, oakPath: `${oakFullpath}.user`, entity: entity, entityId: entityId, relations: relations, oakId: userId }))] }));
}
