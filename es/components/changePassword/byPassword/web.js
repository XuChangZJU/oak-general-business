import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Input, Space, Button, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
export default function Render(props) {
    const { data, methods } = props;
    const { user, failTimes, } = data;
    const { onConfirm } = methods;
    const [password2, setPassword2] = useState('');
    const [password, setPassword] = useState('');
    const [prevPassword, setPrevPassword] = useState('');
    const [validateHelp0, setValidateHelp0] = useState('');
    const [validateStatus0, setValidateStatus0] = useState('');
    const [validateHelp, setValidateHelp] = useState('');
    const [validateHelp1, setValidateHelp1] = useState('');
    const [validateStatus, setValidateStatus] = useState('');
    const reset = () => {
        setPassword2(() => '');
        setPassword(() => '');
        setPrevPassword(() => '');
        setValidateHelp0(() => '');
        setValidateStatus0(() => '');
        setValidateHelp(() => '');
        setValidateHelp1(() => '');
        setValidateStatus(() => '');
    };
    return (_jsxs(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [failTimes >= 5 && _jsx(Alert, { message: "\u60A8\u4ECA\u65E5\u5C1D\u8BD5\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u5019\u518D\u8FDB\u884C\u64CD\u4F5C\u6216\u4F7F\u7528\u624B\u673A\u53F7\u9A8C\u8BC1", type: "error", style: { marginBottom: 20 } }), _jsx(Form.Item, { label: '输入原密码', name: "prevPassword", help: validateHelp0, rules: [
                    {
                        required: true,
                        message: '请输入原密码',
                        validator: (_, value) => {
                            if (!value) {
                                setValidateHelp0('必须填写原密码');
                                setValidateStatus0('error');
                                return;
                            }
                            else {
                                setValidateHelp0('');
                                setValidateStatus0('');
                            }
                        }
                    },
                ], hasFeedback: true, validateStatus: validateStatus0, children: _jsx(Input.Password, { value: prevPassword, onChange: (e) => {
                        const strValue = e.target.value;
                        setPrevPassword(strValue);
                    }, iconRender: (visible) => (visible ? _jsx(EyeTwoTone, {}) : _jsx(EyeInvisibleOutlined, {})), placeholder: '请输入原密码' }) }), _jsx(Form.Item, { label: '输入新密码', name: "password", help: validateHelp1, rules: [
                    {
                        required: true,
                        message: '请输入新密码',
                        validator: (_, value) => {
                            if (value.length < 8) {
                                setValidateHelp1('密码最短长度为8位');
                                setValidateStatus('error');
                                return;
                            }
                            else {
                                setValidateHelp1('');
                                setValidateStatus('');
                            }
                            if (password2) {
                                setValidateHelp(value === password2 ? '' : '两次输入的密码不一致，请检查');
                                setValidateStatus(value === password2 ? 'success' : 'error');
                            }
                        }
                    },
                ], hasFeedback: true, validateStatus: validateStatus, children: _jsx(Input.Password, { value: password, onChange: (e) => {
                        const strValue = e.target.value;
                        setPassword(strValue);
                    }, iconRender: (visible) => (visible ? _jsx(EyeTwoTone, {}) : _jsx(EyeInvisibleOutlined, {})), placeholder: '请输入新密码' }) }), _jsx(Form.Item, { label: '确认新密码', name: "passwordConfirm", rules: [
                    {
                        required: true,
                        validator: (_, value) => {
                            if (password.length < 8) {
                                return;
                            }
                            setValidateHelp(value === password ? '' : '两次输入的密码不一致，请检查');
                            setValidateStatus(value === password ? 'success' : 'error');
                        }
                    },
                ], validateTrigger: "onChange", help: validateHelp, validateStatus: validateStatus, hasFeedback: true, children: _jsx(Input.Password, { value: password2, onChange: (e) => {
                        const strValue = e.target.value;
                        setPassword2(strValue);
                    }, iconRender: (visible) => (visible ? _jsx(EyeTwoTone, {}) : _jsx(EyeInvisibleOutlined, {})), placeholder: '请再次输入密码' }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { htmlType: "reset", type: "primary", onClick: async () => {
                                await onConfirm(prevPassword, password);
                                reset();
                            }, disabled: !(failTimes < 5 && prevPassword && password && password.length >= 8 && password === password2), children: "\u63D0\u4EA4" }), _jsx(Button, { htmlType: "reset", onClick: reset, children: "\u91CD\u7F6E" })] }) })] }));
}
