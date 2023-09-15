"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const icons_1 = require("@ant-design/icons");
function Render(props) {
    const { data, methods } = props;
    const { user, captcha, counter, mobile, } = data;
    const { setCaptcha, sendCaptcha, onConfirmByMobile, setMobile } = methods;
    const [password, setPassword] = (0, react_1.useState)('');
    const [password2, setPassword2] = (0, react_1.useState)('');
    const [validateHelp, setValidateHelp] = (0, react_1.useState)('');
    const [validateHelp2, setValidateHelp2] = (0, react_1.useState)('');
    const [validateStatus, setValidateStatus] = (0, react_1.useState)('');
    const reset = () => {
        setPassword2('');
        setPassword('');
        setValidateHelp('');
        setValidateHelp2('');
        setValidateStatus('');
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [(user?.mobile$user && user?.mobile$user?.length > 0) && (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '手机号', children: (0, jsx_runtime_1.jsx)(antd_1.Select, { defaultValue: user?.mobile$user[0].mobile, options: user?.mobile$user.map((ele) => {
                        return {
                            label: ele.mobile,
                            value: ele.mobile,
                        };
                    }), value: mobile, onChange: (value) => {
                        setMobile(value);
                    } }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "captcha", label: '输入验证码', rules: [
                    {
                        required: true,
                        message: '请输入验证码',
                    },
                ], children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, maxLength: 4, placeholder: '请输入验证码', onChange: (e) => {
                        setCaptcha(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", type: "link", disabled: (!mobile) || counter > 0, onClick: () => sendCaptcha(mobile), children: counter > 0 ? `${counter}秒后可重发` : '发送验证码' }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '输入新密码', name: "password", help: validateHelp, rules: [
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
                ], hasFeedback: true, validateStatus: validateStatus, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password, onChange: (e) => {
                        const strValue = e.target.value;
                        setPassword(strValue);
                    }, iconRender: (visible) => (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})), placeholder: '请输入新密码' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '确认新密码', name: "passwordConfirm", rules: [
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
                ], validateTrigger: "onChange", help: validateHelp2, validateStatus: validateStatus, hasFeedback: true, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password2, onChange: (e) => {
                        const strValue = e.target.value;
                        setPassword2(strValue);
                    }, iconRender: (visible) => (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})), placeholder: '请再次输入新密码' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: async () => {
                                await onConfirmByMobile(mobile, captcha, password);
                            }, disabled: !(password.length >= 8 && password === password2), children: "\u63D0\u4EA4" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", onClick: reset, children: "\u91CD\u7F6E" })] }) })] }));
}
exports.default = Render;
