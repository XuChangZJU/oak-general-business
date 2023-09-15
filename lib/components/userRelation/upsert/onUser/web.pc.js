"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const userRelation_1 = tslib_1.__importDefault(require("./userRelation"));
const icons_1 = require("@ant-design/icons");
const password_1 = require("../../../../utils/password");
function Render(props) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId, setPasswordConfirm } = props.data;
    const { t, update } = props.methods;
    const [password2, setPassword2] = (0, react_1.useState)('');
    const [validateHelp, setValidateHelp] = (0, react_1.useState)('');
    const [validateHelp1, setValidateHelp1] = (0, react_1.useState)('');
    const [validateStatus, setValidateStatus] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { style: { marginBottom: 0 }, label: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.tip, children: !isNew ? t('existedUser') : t('newUser') }), colon: false }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.name'), name: "name", rules: [
                        {
                            required: true,
                        },
                    ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: !isNew, onChange: (e) => {
                                const strValue = e.target.value;
                                update({
                                    name: strValue,
                                });
                            }, value: name, placeholder: t('placeholder.name') }) }) }), !isNew ? (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.nickname'), name: "nickname", rules: [
                        {
                            required: true,
                        },
                    ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: true, value: nickname }) }) }) :
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.password'), name: "password", help: validateHelp1, rules: [
                                    {
                                        message: '请输入密码',
                                        validator: (_, value) => {
                                            if (!value && !password2) {
                                                setValidateHelp1('');
                                                setValidateStatus('');
                                                return;
                                            }
                                            if (value.length < 8) {
                                                setValidateHelp1('密码最短长度为8位');
                                                setValidateStatus('error');
                                                return;
                                            }
                                            else {
                                                if (password2) {
                                                    setValidateHelp(value === password2 ? '' : '两次输入的密码不一致，请检查');
                                                    setValidateStatus(value === password2 ? 'success' : 'error');
                                                }
                                                else {
                                                    setValidateHelp('请再次确认密码');
                                                    setValidateStatus('error');
                                                }
                                            }
                                        }
                                    },
                                ], hasFeedback: true, validateStatus: validateStatus, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password, onChange: (e) => {
                                        const strValue = e.target.value;
                                        update({
                                            password: strValue,
                                        });
                                        setPasswordConfirm((password2 || strValue) ? password2 === strValue : true);
                                    }, iconRender: (visible) => (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})), placeholder: t('placeholder.password') }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '确认密码', name: "passwordConfirm", rules: [
                                    {
                                        validator: (_, value) => {
                                            if (!value && !password) {
                                                setValidateHelp('');
                                                setValidateStatus('');
                                                return;
                                            }
                                            if (password.length < 8) {
                                                return;
                                            }
                                            setValidateHelp(value === password ? '' : '两次输入的密码不一致，请检查');
                                            setValidateStatus(value === password ? 'success' : 'error');
                                        }
                                    },
                                ], validateTrigger: "onChange", help: validateHelp, validateStatus: validateStatus, hasFeedback: true, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password2, onChange: (e) => {
                                        const strValue = e.target.value;
                                        setPassword2(strValue);
                                        if (password === strValue) {
                                            update({
                                                passwordSha1: (0, password_1.encryptPasswordSha1)(password)
                                            });
                                        }
                                        setPasswordConfirm((password || strValue) ? password === strValue : true);
                                    }, iconRender: (visible) => (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})), placeholder: '请再次输入密码' }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('auth'), rules: [
                        {
                            required: true,
                        },
                    ], name: "relation", children: (0, jsx_runtime_1.jsx)(userRelation_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? `${oakFullpath}.userRelation$user`
                            : undefined, entity: entity, entityId: entityId, relations: relations }) })] }) }));
}
exports.default = Render;
