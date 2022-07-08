import React, { Component } from 'react';
import { Card, Form, Input, Checkbox, Button, Tabs } from 'antd';
import { LockOutlined, FieldNumberOutlined, MobileOutlined } from '@ant-design/icons';
import { isMobile, isPassword, isCaptcha } from 'oak-domain/lib/utils/validator';


const { TabPane } = Tabs;

export default function render() {
    const { mobile, captcha, password } = this.state;
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const validPassword = isPassword(password);
    const allowSubmit = validMobile && (validCaptcha|| validPassword);

    return (
        <div className='page-body'>
            <div style={{
                flex: 2,
            }} />
            <Card className="card">
                <Tabs defaultActiveKey="1" size="large" tabBarStyle={{ width: '100%' }}>
                    <TabPane tab="in Password" key="1">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="mobile"
                                rules={[{ required: true, message: 'Please input your Mobile!' }]}
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
                                rules={[{ required: true, message: 'Please input your Password!' }]}
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
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="in Captcha" key="2">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="mobile"
                                rules={[{ required: true, message: 'Please input your Mobile!' }]}
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
                                        disabled={!validMobile}
                                        onClick={() => this.sendCaptcha('web')}
                                    >
                                        Send
                                    </Button>
                                </Input.Group>
                            </Form.Item>
                            <Form.Item
                                name="captcha"
                                rules={[{ required: true, message: 'Please input the captcha received!' }]}
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
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
            <div style={{
                flex: 3,
            }} />
        </div>
    );
}
