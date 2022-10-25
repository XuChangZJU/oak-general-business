import React from 'react';
import { Form, Input, Checkbox, Button, Space } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

export default function render(this: any) {
    const { relations, entity } = this.props;
    const { name, mobile, password, relationArr } = this.state;
    const relationArr2: string[] =
        typeof relations === 'object'
            ? relations
            : relations && JSON.parse(relations);
    return (
        <PageHeader showBack={true} title="添加权限">
            <div className={Style.container}>
                <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '姓名不能为空',
                            },
                        ]}
                    >
                        <>
                            <Input
                                onChange={(e) => {
                                    this.setUpdateData('name', e.target.value);
                                }}
                                value={name}
                                placeholder="请输入姓名"
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label="手机号码"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '手机号不能为空',
                            },
                            {
                                min: 11,
                                message: '请输入11位手机号',
                            },
                            {
                                max: 11,
                                message: '请输入11位手机号',
                            },
                        ]}
                    >
                        <>
                            <Input
                                maxLength={11}
                                value={mobile}
                                onChange={(e) => {
                                    const strValue = e.target.value;
                                    this.setUpdateData(
                                        'mobile$user.0.mobile',
                                        strValue.replace(/[^\d\-\d]/g, '')
                                    );
                                }}
                                placeholder="请输入手机号码"
                                type="tel"
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                        ]}
                    >
                        <>
                            <Input
                                value={password}
                                onChange={(e) => {
                                    this.setUpdateData(
                                        'password',
                                        e.target.value
                                    );
                                }}
                                placeholder="不少于八位"
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label="权限"
                        rules={[
                            {
                                required: true,
                                message: '请至少选择一个权限',
                            },
                        ]}
                        name="relation"
                    >
                        <>
                            <Checkbox.Group
                                value={relationArr}
                                onChange={(value) => {
                                    this.setRelationValue(value);
                                }}
                                options={relationArr2.map((ele) => ({
                                    value: ele,
                                    label:
                                        (this.t &&
                                            this.t(entity + ':r.' + ele)) ||
                                        ele,
                                }))}
                            ></Checkbox.Group>
                        </>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                    this.onConfirm();
                                }}
                            >
                                提交
                            </Button>
                            <Button htmlType="reset">重置</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeader>
    );
}
