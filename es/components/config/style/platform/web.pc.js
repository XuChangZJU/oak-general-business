import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Alert, Affix, Space, Typography } from 'antd';
import Style from './web.module.less';
import StyleUpsert from '../../style';
export default function Render(props) {
    const { entity, currentStyle, dirty, name } = props.data;
    const { resetStyle, updateStyle, setValue, t } = props.methods;
    return (_jsxs(_Fragment, { children: [_jsx(Affix, { offsetTop: 64, children: _jsx(Alert, { message: _jsx("div", { children: _jsxs("text", { children: ["\u60A8\u6B63\u5728\u66F4\u65B0", _jsx(Typography.Text, { keyboard: true, children: entity }), "\u5BF9\u8C61", _jsx(Typography.Text, { keyboard: true, children: name }), "\u7684\u6837\u5F0F\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"] }) }), type: "info", showIcon: true, action: _jsxs(Space, { children: [_jsx(Button, { disabled: !dirty, type: "primary", danger: true, onClick: () => resetStyle(), style: {
                                    marginRight: 10,
                                }, children: t('common::reset') }), _jsx(Button, { disabled: !dirty, type: "primary", onClick: () => updateStyle(), children: t('common::action.confirm') })] }) }) }), _jsx("div", { className: Style.contains, children: _jsx(StyleUpsert, { value: currentStyle, onChange: (s) => {
                        setValue(s);
                    } }) })] }));
}
