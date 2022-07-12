import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, DatePicker, Radio } from 'antd';
import moment from 'moment';

export default function render() {
    const onChange = (data, dataString) => {
        this.setUpdateData('birth', data);
    }
    const { gender, GenderOptions, IDCardTypeOptions, birth } = this.state;
    return (
        <div className="web-mobile-container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="昵称"
                    required
                >
                    <Input
                        onChange={this.setValue}
                        oak:value="nickname"
                    />
                </Form.Item>

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
                    label="出生日期"
                    required
                >
                    <DatePicker onChange={onChange} value={moment(birth)} />
                </Form.Item>

                <Form.Item
                    label="性别"
                    required
                >
                    <Radio.Group
                        options={GenderOptions}
                        onChange={this.setValue}
                        buttonStyle="solid"
                        optionType="button"
                        oak:value="gender"
                    />
                </Form.Item>
                <Form.Item
                    label="证件类别"
                    required
                >
                    <Radio.Group
                        options={IDCardTypeOptions}
                        onChange={this.setValue}
                        oak:value="idCardType"
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>
                <Form.Item
                    label="证件号"
                    required
                >
                    <Input
                        type="number"
                        onChange={this.setValue}
                        oak:value="idNumber"
                    />
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
