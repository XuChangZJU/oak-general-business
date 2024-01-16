import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import UserRelation from './userRelation';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { encryptPasswordSha1 } from '../../../../utils/password';
export default function Render(props) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId, setPasswordConfirm, passwordRequire, allowUpdateName, allowUpdateNickname, } = props.data;
    const { t, update } = props.methods;
    const [form] = Form.useForm();
    const [password2, setPassword2] = useState('');
    const [validateHelp, setValidateHelp] = useState('');
    const [validateHelp1, setValidateHelp1] = useState('');
    const [validateStatus, setValidateStatus] = useState('');
    useEffect(() => {
        form.setFieldsValue({
            name,
        });
    }, [name]);
    useEffect(() => {
        form.setFieldsValue({
            nickname,
        });
    }, [nickname]);
    return (<>
            <Form form={form} colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item style={{ marginBottom: 0 }} label={!isNew ? t('existedUser') : t('newUser')} colon={false}/>
                <Form.Item label={t('user:attr.name')} name="name" rules={[
            {
                required: true,
            },
        ]}>
                    <>
                        <Input disabled={!isNew && !allowUpdateName} onChange={(e) => {
            const strValue = e.target.value;
            update({
                name: strValue,
            });
        }} value={name} placeholder={t('placeholder.name')}/>
                    </>
                </Form.Item>
                <Form.Item label={t('user:attr.nickname')} name="nickname">
                    <>
                        <Input disabled={!isNew && !allowUpdateNickname} value={nickname} onChange={(e) => {
            const strValue = e.target.value;
            update({
                nickname: strValue,
            });
        }} placeholder={t('placeholder.nickname')}/>
                    </>
                </Form.Item>
                {isNew ? (<>
                        <Form.Item label={t('user:attr.password')} name="password" help={validateHelp1} rules={[
                {
                    required: passwordRequire,
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
            ]} hasFeedback validateStatus={validateStatus}>
                            <Input.Password value={password} onChange={(e) => {
                const strValue = e.target.value;
                update({
                    password: strValue,
                });
                setPasswordConfirm(password2 || strValue
                    ? password2 === strValue
                    : true);
            }} iconRender={(visible) => visible ? (<EyeTwoTone />) : (<EyeInvisibleOutlined />)} placeholder={t('placeholder.password')}/>
                        </Form.Item>
                        <Form.Item label={'确认密码'} name="confirmPassword" rules={[
                {
                    required: passwordRequire,
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
            ]} validateTrigger="onChange" help={validateHelp} validateStatus={validateStatus} hasFeedback>
                            <Input.Password value={password2} onChange={(e) => {
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
            }} iconRender={(visible) => visible ? (<EyeTwoTone />) : (<EyeInvisibleOutlined />)} placeholder={t('placeholder.confirmPassword')}/>
                        </Form.Item>
                    </>) : null}
                <Form.Item label={t('auth')} rules={[
            {
                required: true,
            },
        ]} name="relation">
                    <UserRelation oakAutoUnmount={true} oakPath={`${oakFullpath}.userRelation$user`} entity={entity} entityId={entityId} relations={relations}/>
                </Form.Item>
            </Form>
        </>);
}
