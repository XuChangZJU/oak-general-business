import React, { useState } from 'react';
import { Form, Checkbox, Input } from 'antd';
import UserRelation from './userRelation';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { encryptPasswordSha1 } from '../../../../utils/password';

export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    nickname: string;
    password: string;
    mobileValue: string;
    mobileValueReady: boolean;
    oakId: string;
    relations: EntityDict['relation']['OpSchema'][];
    entity: keyof EntityDict;
    entityId: string;
    isNew: boolean;
    setPasswordConfirm: (value: boolean) => void;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId, setPasswordConfirm } = props.data;
    const { t, update } = props.methods;
    const [password2, setPassword2] = useState('');
    const [validateHelp, setValidateHelp] = useState('');
    const [validateHelp1, setValidateHelp1] = useState('');
    const [validateStatus, setValidateStatus] = useState('' as '' | "success" | "warning" | "error" | "validating" | undefined);
    return (
        <>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item
                    style={{ marginBottom: 0 }}
                    label={!isNew ? t('existedUser') : t('newUser')}
                    colon={false}
                />
                <Form.Item
                    label={t('user:attr.name')}
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <>
                        <Input
                            disabled={!isNew}
                            onChange={(e) => {
                                const strValue = e.target.value;
                                update({
                                    name: strValue,
                                });
                            }}
                            value={name}
                            placeholder={t('placeholder.name')}
                        />
                    </>
                </Form.Item>
                {!isNew ? (
                    <Form.Item
                        label={t('user:attr.nickname')}
                        name="nickname"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <>
                            <Input disabled={true} value={nickname} />
                        </>
                    </Form.Item>
                ) : (
                    <>
                        <Form.Item
                            label={t('user:attr.password')}
                            name="password"
                            help={validateHelp1}
                            rules={[
                                {
                                    message: '请输入密码',
                                    validator: (_, value) => {
                                        if (!value && !password2) {
                                            setValidateHelp1('');
                                            setValidateStatus('');
                                            return;
                                        }
                                        if (value.length < 8) {
                                            setValidateHelp1(
                                                '密码最短长度为8位'
                                            );
                                            setValidateStatus('error');
                                            return;
                                        } else {
                                            if (password2) {
                                                setValidateHelp(
                                                    value === password2
                                                        ? ''
                                                        : '两次输入的密码不一致，请检查'
                                                );
                                                setValidateStatus(
                                                    value === password2
                                                        ? 'success'
                                                        : 'error'
                                                );
                                            } else {
                                                setValidateHelp(
                                                    '请再次确认密码'
                                                );
                                                setValidateStatus('error');
                                            }
                                        }
                                    },
                                },
                            ]}
                            hasFeedback
                            validateStatus={validateStatus}
                        >
                            <Input.Password
                                value={password}
                                onChange={(e) => {
                                    const strValue = e.target.value;
                                    update({
                                        password: strValue,
                                    });
                                    setPasswordConfirm(
                                        password2 || strValue
                                            ? password2 === strValue
                                            : true
                                    );
                                }}
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                placeholder={t('placeholder.password')}
                            />
                        </Form.Item>
                        <Form.Item
                            label={'确认密码'}
                            name="passwordConfirm"
                            rules={[
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
                                        setValidateHelp(
                                            value === password
                                                ? ''
                                                : '两次输入的密码不一致，请检查'
                                        );
                                        setValidateStatus(
                                            value === password
                                                ? 'success'
                                                : 'error'
                                        );
                                    },
                                },
                            ]}
                            validateTrigger="onChange"
                            help={validateHelp}
                            validateStatus={validateStatus}
                            hasFeedback
                        >
                            <Input.Password
                                value={password2}
                                onChange={(e) => {
                                    const strValue = e.target.value;
                                    setPassword2(strValue);
                                    if (password === strValue) {
                                        update({
                                            passwordSha1:
                                                encryptPasswordSha1(password),
                                        });
                                    }
                                    setPasswordConfirm(
                                        password || strValue
                                            ? password === strValue
                                            : true
                                    );
                                }}
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                placeholder={'请再次输入密码'}
                            />
                        </Form.Item>
                    </>
                )}
                <Form.Item
                    label={t('auth')}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    name="relation"
                >
                    <UserRelation
                        oakAutoUnmount={true}
                        oakPath={`${oakFullpath}.userRelation$user`}
                        entity={entity}
                        entityId={entityId}
                        relations={relations}
                    />
                </Form.Item>
            </Form>
        </>
    );
}
