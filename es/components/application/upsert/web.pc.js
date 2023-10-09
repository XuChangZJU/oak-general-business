import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Select, Input } from 'antd';
export default function Render(props) {
    const { name, description, type, typeArr, $$createAt$$, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                            update({
                                name: e.target.value,
                            });
                        }, value: name }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                            update({
                                description: e.target.value,
                            });
                        }, value: description }) }) }), _jsx(Form.Item, { label: "\u5E94\u7528\u7C7B\u578B", required: true, children: _jsx(_Fragment, { children: _jsx(Select, { value: type, style: { width: 120 }, disabled: $$createAt$$ > 1, options: typeArr.map((ele) => ({
                            label: t(`application:v.type.${ele.value}`),
                            value: ele.value,
                        })), onChange: (value) => {
                            update({
                                type: value,
                            });
                        } }) }) })] }));
}
