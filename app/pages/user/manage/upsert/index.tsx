import React, { Component } from 'react';
import { Button, Checkbox, Input } from 'tdesign-mobile-react';

export default function render() {
    const onChange = (data, dataString) => {
        this.setUpdateData('birth', data);
    }
    const { gender, GenderOptions, IDCardTypeOptions, birth } = this.state;
    return (
        <div className="web-mobile-container">
            <Input
                required={true}
                label="昵称"
                onChange={this.setValue}
                oak:value="nickname"
            />
            <Input
                required={true}
                label="姓名"
                onChange={this.setValue}
                oak:value="name"
            />
            <Input
                required={true}
                label="姓名"
                onChange={this.setValue}
                oak:value="name"
            />
            <Input
                type="证件号"
                onChange={this.setValue}
                oak:value="idNumber"
            />
            {/* <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
           

                <Form.Item label="出生日期" required>
                    <DatePicker onChange={onChange} value={moment(birth)} />
                </Form.Item>

                <Form.Item label="性别" required>
                    <Radio.Group
                        options={GenderOptions}
                        onChange={this.setValue}
                        buttonStyle="solid"
                        optionType="button"
                        oak:value="gender"
                    />
                </Form.Item>
                <Form.Item label="证件类别" required>
                    <Radio.Group
                        options={IDCardTypeOptions}
                        onChange={this.setValue}
                        oak:value="idCardType"
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Form.Item>
                <Form.Item label="证件号" required>
                    <Input
                        type="number"
                        onChange={this.setValue}
                        oak:value="idNumber"
                    />
                </Form.Item>
            </Form> */}

            <Button
                block
                theme="primary"
                onClick={(event) => {
                    this.confirm();
                }}
            >
                确定
            </Button>
        </div>
    );
}
