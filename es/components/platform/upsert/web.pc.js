import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input } from 'antd';
export default function Render(props) {
    const { name, description, style } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsxs(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                            update({
                                name: e.target.value,
                            });
                        }, value: name }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                            update({
                                description: e.target.value,
                            });
                        }, value: description }) }) })] }));
}
