import React, { useState } from 'react';
import { Tag, Badge, Form, Input, Tabs, Space, Button, Alert } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { EyeInvisibleOutlined, EyeTwoTone, MobileOutlined } from '@ant-design/icons';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            user: EntityDict['user']['Schema'],
            failTimes: number,
        },
        {
            onConfirm: (prevPassword: string, password: string) => Promise<void>;
        }
    >
) {
    const { data, methods } = props;
    const {
        user,
        failTimes,
    } = data;
    const { onConfirm } = methods;
    const [password2, setPassword2] = useState('');
    const [password, setPassword] = useState('');
    const [prevPassword, setPrevPassword] = useState('');
    const [validateHelp0, setValidateHelp0] = useState('');
    const [validateStatus0, setValidateStatus0] = useState('' as '' | "success" | "warning" | "error" | "validating" | undefined);
    const [validateHelp, setValidateHelp] = useState('');
    const [validateHelp1, setValidateHelp1] = useState('');
    const [validateStatus, setValidateStatus] = useState('' as '' | "success" | "warning" | "error" | "validating" | undefined);

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
    return (
        <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
            {failTimes >= 5 && <Alert message="您今日尝试次数过多，请稍候再进行操作或使用手机号验证" type="error" style={{ marginBottom: 20 }} />}
            <Form.Item
                label={'输入原密码'}
                name="prevPassword"
                help={validateHelp0}
                rules={[
                    {
                        required: true,
                        message: '请输入原密码',
                        validator: (_, value) => {
                            if (!value) {
                                setValidateHelp0('必须填写原密码')
                                setValidateStatus0('error')
                                return;
                            } else {
                                setValidateHelp0('')
                                setValidateStatus0('')
                            }
                        }
                    },
                ]}
                hasFeedback
                validateStatus={validateStatus0}
            >
                <Input.Password
                    value={prevPassword}
                    onChange={(e) => {
                        const strValue = e.target.value;
                        setPrevPassword(strValue);
                    }}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder={'请输入原密码'}
                />
            </Form.Item>
            <Form.Item
                label={'输入新密码'}
                name="password"
                help={validateHelp1}
                rules={[
                    {
                        required: true,
                        message: '请输入新密码',
                        validator: (_, value) => {
                            if (value.length < 8) {
                                setValidateHelp1('密码最短长度为8位')
                                setValidateStatus('error')
                                return;
                            } else {
                                setValidateHelp1('')
                                setValidateStatus('')
                            }
                            if (password2) {
                                setValidateHelp(value === password2 ? '' : '两次输入的密码不一致，请检查')
                                setValidateStatus(value === password2 ? 'success' : 'error')
                            }
                        }
                    },
                ]}
                hasFeedback
                validateStatus={validateStatus}

            >
                <Input.Password
                    value={password}
                    onChange={(e) => {
                        const strValue = e.target.value;
                        setPassword(strValue);
                    }}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder={'请输入新密码'}
                />
            </Form.Item>
            <Form.Item
                label={'确认新密码'}
                name="passwordConfirm"
                rules={[
                    {
                        required: true,
                        validator: (_, value) => {
                            if (password.length < 8) {
                                return;
                            }
                            setValidateHelp(value === password ? '' : '两次输入的密码不一致，请检查')
                            setValidateStatus(value === password ? 'success' : 'error')
                        }
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
                        setPassword2(strValue)
                    }}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    placeholder={'请再次输入密码'}
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                    <Button
                        htmlType="reset"
                        type="primary"
                        onClick={async () => {
                            await onConfirm(prevPassword, password);
                            reset();
                        }}
                        disabled={!(failTimes < 5 && prevPassword && password && password.length >= 8 && password === password2)}
                    >
                        提交
                    </Button>
                    <Button htmlType="reset" onClick={reset}>
                        重置
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
