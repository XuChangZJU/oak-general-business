import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Space, Input } from 'antd';
export default function Render(props) {
    const { name, description, entityId, entity, oakId, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u540D\u79F0", required: true, name: "name", rules: [
                            {
                                required: true,
                            },
                        ], children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                    update({
                                        name: e.target.value,
                                    });
                                }, value: name }) }) }), _jsx(Form.Item, { label: "\u63CF\u8FF0", required: true, name: "description", children: _jsx(_Fragment, { children: _jsx(Input.TextArea, { onChange: (e) => {
                                    update({
                                        description: e.target.value,
                                    });
                                }, value: description }) }) }), _jsx(Form.Item, { wrapperCol: { offset: 6 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
                                        confirm();
                                    }, children: "\u786E\u5B9A" }), _jsx(Button, { onClick: () => {
                                        navigateBack();
                                    }, children: "\u8FD4\u56DE" })] }) })] }) }) }));
}
