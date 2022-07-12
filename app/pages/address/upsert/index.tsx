import React, { Component } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

export default function render() {
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    required
                >
                    <Input
                        onChange={this.setValue}
                        oak:value="name"
                    />
                </Form.Item>

                <Form.Item
                    label="手机号"
                    required
                >
                    <Input
                        onChange={this.setValue}
                        oak:value="phone"
                    />
                </Form.Item>

                <Form.Item
                    label="所在地区"
                    required
                >
                    <Input
                        placeholder="所在地区"
                        onChange={this.setValue}
                        oak:value="areaText"
                    />
                </Form.Item>

                <Form.Item
                    label="详细地址"
                    rules={[{ required: true, message: '请输入详细地址' }]}
                >
                    <Input.TextArea showCount maxLength={100} oak:value="detail" />
                </Form.Item>
            </Form>
            

            <Button
                block
                size="middle"
                type="primary"
                onClick={(event) => {
                    this.confirm();
                }}
            >
                确定
            </Button>
        </div>
    );
}
