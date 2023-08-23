"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var userRelation_1 = tslib_1.__importDefault(require("./userRelation"));
var icons_1 = require("@ant-design/icons");
var password_1 = require("../../../../utils/password");
function Render(props) {
    var _a = props.data, name = _a.name, isNew = _a.isNew, nickname = _a.nickname, password = _a.password, relations = _a.relations, oakFullpath = _a.oakFullpath, entity = _a.entity, entityId = _a.entityId, setPasswordConfirm = _a.setPasswordConfirm;
    var _b = props.methods, t = _b.t, update = _b.update;
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), password2 = _c[0], setPassword2 = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp = _d[0], setValidateHelp = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp1 = _e[0], setValidateHelp1 = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), validateStatus = _f[0], setValidateStatus = _f[1];
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { style: { marginBottom: 0 }, label: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.tip }, { children: !isNew ? t('existedUser') : t('newUser') })), colon: false }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.name'), name: "name", rules: [
                        {
                            required: true,
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: !isNew, onChange: function (e) {
                                var strValue = e.target.value;
                                update({
                                    name: strValue,
                                });
                            }, value: name, placeholder: t('placeholder.name') }) }) })), !isNew ? (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.nickname'), name: "nickname", rules: [
                        {
                            required: true,
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: true, value: nickname }) }) })) :
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.password'), name: "password", help: validateHelp1, rules: [
                                    {
                                        message: '请输入密码',
                                        validator: function (_, value) {
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
                                ], hasFeedback: true, validateStatus: validateStatus }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password, onChange: function (e) {
                                        var strValue = e.target.value;
                                        update({
                                            password: strValue,
                                        });
                                        setPasswordConfirm((password2 || strValue) ? password2 === strValue : true);
                                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: t('placeholder.password') }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '确认密码', name: "passwordConfirm", rules: [
                                    {
                                        validator: function (_, value) {
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
                                ], validateTrigger: "onChange", help: validateHelp, validateStatus: validateStatus, hasFeedback: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password2, onChange: function (e) {
                                        var strValue = e.target.value;
                                        setPassword2(strValue);
                                        if (password === strValue) {
                                            update({
                                                passwordSha1: (0, password_1.encryptPasswordSha1)(password)
                                            });
                                        }
                                        setPasswordConfirm((password || strValue) ? password === strValue : true);
                                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: '请再次输入密码' }) }))] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('auth'), rules: [
                        {
                            required: true,
                        },
                    ], name: "relation" }, { children: (0, jsx_runtime_1.jsx)(userRelation_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? "".concat(oakFullpath, ".userRelation$user")
                            : undefined, entity: entity, entityId: entityId, relations: relations }) }))] })) })));
}
exports.default = Render;
