import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Input, Space, Modal } from 'antd';
export default function Render(props) {
    const { text, tagName, open, changeOpen, editTag, addTag, changeText, isUpdate, } = props.data;
    const { t, update, navigateBack } = props.methods;
    return (_jsx(Modal, { open: open, title: '\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E\u4FE1\u606F', onCancel: () => changeOpen(false), footer: _jsxs(Space, { style: { display: 'flex', justifyContent: 'center' }, children: [_jsx(Button, { onClick: () => changeOpen(false), children: "\u53D6\u6D88" }), _jsx(Button, { type: 'primary', onClick: () => {
                        if (isUpdate) {
                            editTag();
                        }
                        else {
                            addTag();
                        }
                        changeOpen(false);
                    }, disabled: text !== tagName ? false : true, children: "\u786E\u5B9A" })] }), children: _jsx(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: _jsx(Form.Item, { label: "TAG\u540D\u79F0", required: true, rules: [
                    {
                        required: true,
                    },
                ], children: _jsx(_Fragment, { children: _jsx(Input, { value: text, onChange: (v) => changeText(v.target.value), placeholder: '\u6807\u7B7E\u540D\u79F0', maxLength: 30 }) }) }) }) }));
}
