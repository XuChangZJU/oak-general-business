import React, { Component } from 'react';
import { Card, Form, Input, Checkbox, Button, Tabs } from 'antd';
import { LockOutlined, FieldNumberOutlined, MobileOutlined } from '@ant-design/icons';
import { isMobile, isPassword, isCaptcha } from 'oak-domain/lib/utils/validator';


const { TabPane } = Tabs;

export default function render() {
    const { onlyCaptcha, onlyPassword } = this.props;
    const { mobile, captcha, password, counter } = this.state;
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const validPassword = isPassword(password);
    const allowSubmit = validMobile && (validCaptcha || validPassword);

    const LoginPassword = (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
        >
            <Form.Item
                name="mobile"
            >
                <Input
                    allowClear
                    value={mobile}
                    type="tel"
                    data-attr="mobile"
                    maxLength={11}
                    prefix={<MobileOutlined className="site-form-item-icon" />}
                    placeholder="Mobile"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onInput(e)}
                />
            </Form.Item>
            <Form.Item
                name="password"
            >
                <Input
                    allowClear
                    value={password}
                    data-attr="password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onInput(e)}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={!allowSubmit}
                    onClick={() => this.loginByMobile()}
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
    const LoginCaptcha = (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
        >
            <Form.Item
                name="mobile"
            >
                <Input.Group compact>
                    <Input
                        allowClear
                        value={mobile}
                        data-attr="mobile"
                        type="tel"
                        maxLength={11}
                        prefix={<MobileOutlined className="site-form-item-icon" />}
                        placeholder="Mobile"
                        style={{ width: 'calc(100% - 65px)' }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onInput(e)}
                    />
                    <Button
                        type="primary"
                        style={{
                            width: 65,
                        }}
                        disabled={!validMobile || counter > 0}
                        onClick={() => this.sendCaptcha()}
                    >
                        {counter > 0 ? counter : 'Send'}
                    </Button>
                </Input.Group>
            </Form.Item>
            <Form.Item
                name="captcha"
            >
                <Input
                    allowClear
                    value={captcha}
                    data-attr="captcha"
                    prefix={<FieldNumberOutlined className="site-form-item-icon" />}
                    type="number"
                    maxLength={4}
                    placeholder="Captcha"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onInput(e)}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={!allowSubmit}
                    onClick={() => this.loginByMobile()}
                >
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
    if (onlyCaptcha) {
        return (
            <div className='page-body'>
                <div style={{
                    flex: 2,
                }} />
                {LoginCaptcha}
                <div style={{
                    flex: 3,
                }} />
            </div>
        );
    }
    else if (onlyPassword) {
        return (
            <div className='page-body'>
                <div style={{
                    flex: 2,
                }} />
                {LoginPassword}
                <div style={{
                    flex: 3,
                }} />
            </div>
        );
    }
    return (
        <div className='page-body'>
            <div style={{
                flex: 2,
            }} />
            <Card className="card">
                <Tabs defaultActiveKey="1" size="large" tabBarStyle={{ width: '100%' }}>
                    <TabPane tab="in Password" key="1">
                        {LoginPassword}
                    </TabPane>
                    <TabPane tab="in Captcha" key="2">
                        {LoginCaptcha}
                    </TabPane>
                </Tabs>
            </Card>
            <div style={{
                flex: 3,
            }} />
        </div>
    );
}
