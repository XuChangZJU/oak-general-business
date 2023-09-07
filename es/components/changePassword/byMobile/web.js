import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Input, Space, Button, Select } from 'antd';
import Style from './web.module.less';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
export default function Render(props) {
    const { data, methods } = props;
    const { user, captcha, counter, mobile, } = data;
    const { setCaptcha, sendCaptcha, onConfirmByMobile, setMobile } = methods;
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [validateHelp, setValidateHelp] = useState('');
    const [validateHelp2, setValidateHelp2] = useState('');
    const [validateStatus, setValidateStatus] = useState('');
    const reset = () => {
        setPassword2('');
        setPassword('');
        setValidateHelp('');
        setValidateHelp2('');
        setValidateStatus('');
    };
    return (_jsxs(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [(user?.mobile$user && user?.mobile$user?.length > 0) && _jsx(Form.Item, { label: '手机号', children: _jsx(Select, { defaultValue: user?.mobile$user[0].mobile, options: user?.mobile$user.map((ele) => {
                        return {
                            label: ele.mobile,
                            value: ele.mobile,
                        };
                    }), value: mobile, onChange: (value) => {
                        setMobile(value);
                    } }) }), _jsx(Form.Item, { name: "captcha", label: '输入验证码', rules: [
                    {
                        required: true,
                        message: '请输入验证码',
                    },
                ], children: _jsx(Input, { allowClear: true, value: captcha, maxLength: 4, placeholder: '请输入验证码', onChange: (e) => {
                        setCaptcha(e.target.value);
                    }, className: Style['loginbox-input'], suffix: _jsx(Button, { size: "small", type: "link", disabled: (!mobile) || counter > 0, onClick: () => sendCaptcha(mobile), children: counter > 0 ? `${counter}秒后可重发` : '发送验证码' }) }) }), _jsx(Form.Item, { label: '输入新密码', name: "password", help: validateHelp, rules: [
                    {
                        required: true,
                        message: '请输入密码',
                        validator: (_, value) => {
                            if (value.length < 8) {
                                setValidateHelp('密码最短长度为8位');
                                setValidateStatus('error');
                                return;
                            }
                            else {
                                setValidateHelp('');
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
                            setValidateHelp2(value === password ? '' : '两次输入的密码不一致，请检查');
                            setValidateStatus(value === password ? 'success' : 'error');
                        }
                    },
                ], validateTrigger: "onChange", help: validateHelp2, validateStatus: validateStatus, hasFeedback: true, children: _jsx(Input.Password, { value: password2, onChange: (e) => {
                        const strValue = e.target.value;
                        setPassword2(strValue);
                    }, iconRender: (visible) => (visible ? _jsx(EyeTwoTone, {}) : _jsx(EyeInvisibleOutlined, {})), placeholder: '请再次输入新密码' }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: async () => {
                                await onConfirmByMobile(mobile, captcha, password);
                            }, disabled: !(password.length >= 8 && password === password2), children: "\u63D0\u4EA4" }), _jsx(Button, { htmlType: "reset", onClick: reset, children: "\u91CD\u7F6E" })] }) })] }));
}
