import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Input } from 'antd';
import UserRelation from './userRelation';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { encryptPasswordSha1 } from '../../../../utils/password';
export default function Render(props) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId, setPasswordConfirm } = props.data;
    const { t, update } = props.methods;
    const [password2, setPassword2] = useState('');
    const [validateHelp, setValidateHelp] = useState('');
    const [validateHelp1, setValidateHelp1] = useState('');
    const [validateStatus, setValidateStatus] = useState('');
    return (_jsx(_Fragment, { children: _jsxs(Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [_jsx(Form.Item, { style: { marginBottom: 0 }, label: !isNew ? t('existedUser') : t('newUser'), colon: false }), _jsx(Form.Item, { label: t('user:attr.name'), name: "name", rules: [
                        {
                            required: true,
                        },
                    ], children: _jsx(_Fragment, { children: _jsx(Input, { disabled: !isNew, onChange: (e) => {
                                const strValue = e.target.value;
                                update({
                                    name: strValue,
                                });
                            }, value: name, placeholder: t('placeholder.name') }) }) }), !isNew ? (_jsx(Form.Item, { label: t('user:attr.nickname'), name: "nickname", rules: [
                        {
                            required: true,
                        },
                    ], children: _jsx(_Fragment, { children: _jsx(Input, { disabled: true, value: nickname }) }) })) : (_jsxs(_Fragment, { children: [_jsx(Form.Item, { label: t('user:attr.password'), name: "password", help: validateHelp1, rules: [
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
                                                setValidateHelp(value === password2
                                                    ? ''
                                                    : '两次输入的密码不一致，请检查');
                                                setValidateStatus(value === password2
                                                    ? 'success'
                                                    : 'error');
                                            }
                                            else {
                                                setValidateHelp('请再次确认密码');
                                                setValidateStatus('error');
                                            }
                                        }
                                    },
                                },
                            ], hasFeedback: true, validateStatus: validateStatus, children: _jsx(Input.Password, { value: password, onChange: (e) => {
                                    const strValue = e.target.value;
                                    update({
                                        password: strValue,
                                    });
                                    setPasswordConfirm(password2 || strValue
                                        ? password2 === strValue
                                        : true);
                                }, iconRender: (visible) => visible ? (_jsx(EyeTwoTone, {})) : (_jsx(EyeInvisibleOutlined, {})), placeholder: t('placeholder.password') }) }), _jsx(Form.Item, { label: '确认密码', name: "passwordConfirm", rules: [
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
                                        setValidateHelp(value === password
                                            ? ''
                                            : '两次输入的密码不一致，请检查');
                                        setValidateStatus(value === password
                                            ? 'success'
                                            : 'error');
                                    },
                                },
                            ], validateTrigger: "onChange", help: validateHelp, validateStatus: validateStatus, hasFeedback: true, children: _jsx(Input.Password, { value: password2, onChange: (e) => {
                                    const strValue = e.target.value;
                                    setPassword2(strValue);
                                    if (password === strValue) {
                                        update({
                                            passwordSha1: encryptPasswordSha1(password),
                                        });
                                    }
                                    setPasswordConfirm(password || strValue
                                        ? password === strValue
                                        : true);
                                }, iconRender: (visible) => visible ? (_jsx(EyeTwoTone, {})) : (_jsx(EyeInvisibleOutlined, {})), placeholder: '请再次输入密码' }) })] })), _jsx(Form.Item, { label: t('auth'), rules: [
                        {
                            required: true,
                        },
                    ], name: "relation", children: _jsx(UserRelation, { oakAutoUnmount: true, oakPath: oakFullpath
                            ? `${oakFullpath}.userRelation$user`
                            : undefined, entity: entity, entityId: entityId, relations: relations }) })] }) }));
}
