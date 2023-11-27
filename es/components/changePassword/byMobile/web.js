import React, { useState } from 'react';
import { Form, Input, Space, Button, Select } from 'antd';
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
    return (<Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
            {(user?.mobile$user && user?.mobile$user?.length > 0) && <Form.Item label={'手机号'}>
                <Select defaultValue={user?.mobile$user[0].mobile} options={user?.mobile$user.map((ele) => {
                return {
                    label: ele.mobile,
                    value: ele.mobile,
                };
            })} value={mobile} onChange={(value) => {
                setMobile(value);
            }}/>
            </Form.Item>}
            <Form.Item name="captcha" label={'输入验证码'} rules={[
            {
                required: true,
                message: '请输入验证码',
            },
        ]}>
                <Input allowClear value={captcha} maxLength={4} placeholder={'请输入验证码'} onChange={(e) => {
            setCaptcha(e.target.value);
        }} suffix={<Button size="small" type="link" disabled={(!mobile) || counter > 0} onClick={() => sendCaptcha(mobile)}>
                            {counter > 0 ? `${counter}秒后可重发` : '发送验证码'}
                        </Button>}/>
            </Form.Item>
            <Form.Item label={'输入新密码'} name="password" help={validateHelp} rules={[
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
        ]} hasFeedback validateStatus={validateStatus}>
                <Input.Password value={password} onChange={(e) => {
            const strValue = e.target.value;
            setPassword(strValue);
        }} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder={'请输入新密码'}/>
            </Form.Item>
            <Form.Item label={'确认新密码'} name="passwordConfirm" rules={[
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
        ]} validateTrigger="onChange" help={validateHelp2} validateStatus={validateStatus} hasFeedback>
                <Input.Password value={password2} onChange={(e) => {
            const strValue = e.target.value;
            setPassword2(strValue);
        }} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} placeholder={'请再次输入新密码'}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                    <Button type="primary" onClick={async () => {
            await onConfirmByMobile(mobile, captcha, password);
        }} disabled={!(password.length >= 8 && password === password2)}>
                        提交
                    </Button>
                    <Button htmlType="reset" onClick={reset}>
                        重置
                    </Button>
                </Space>
            </Form.Item>
        </Form>);
}
