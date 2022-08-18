import React from 'react';
import { Form, Input, Row, Col, Checkbox, Button } from 'tdesign-react';
const { FormItem } = Form;

export default function render(this: any) {
    const { t } = this;
    const { relations, entity } = this.props;
    const { name, mobile, password, relationArr } = this.state;
    const relations2 =
        typeof relations === 'object'
            ? relations
            : relations && JSON.parse(relations);
    return (
        <div>
            <Row gutter={16}>
                <Col xs={12} sm={4}>
                    <Form
                        colon={false}
                        labelAlign="right"
                        labelWidth="100px"
                        layout="vertical"
                        preventSubmitDefault
                        resetType="empty"
                        showErrorMessage
                        submitWithWarningMessage={false}
                    >
                        <FormItem
                            label="姓名"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '姓名不能为空',
                                    type: 'error',
                                },
                            ]}
                        >
                            <Input
                                onChange={(value, context) => {
                                    this.setUpdateData('name', value);
                                }}
                                value={name}
                                align="left"
                                placeholder="请输入内容"
                                type="text"
                            />
                        </FormItem>
                        <FormItem
                            label="手机号码"
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    message: '手机号不能为空',
                                    type: 'error',
                                },
                                {
                                    min: 11,
                                    message: '请输入11位手机号',
                                    type: 'error',
                                },
                                {
                                    max: 11,
                                    message: '请输入11位手机号',
                                    type: 'error',
                                },
                            ]}
                        >
                            <Input
                                onChange={(value, context) => {
                                    this.setUpdateData(
                                        'mobile$user.0.mobile',
                                        value
                                    );
                                }}
                                value={mobile}
                                align="left"
                                placeholder="请输入内容"
                                size="medium"
                                type="text"
                            />
                        </FormItem>
                        <FormItem
                            initialData="123456"
                            label="密码"
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空',
                                    type: 'error',
                                },
                            ]}
                        >
                            <Input
                                value={password}
                                align="left"
                                placeholder="请输入内容"
                                showClearIconOnEmpty={false}
                                size="medium"
                                status="default"
                                type="text"
                            />
                        </FormItem>
                        <FormItem
                            label="权限"
                            rules={[
                                {
                                    required: true,
                                    message: '请至少选择一个权限',
                                    type: 'error',
                                },
                            ]}
                        >
                            <Checkbox.Group
                                value={relationArr}
                                onChange={(value) => {
                                    this.setRelationValue(value);
                                }}
                                options={relations2.map((ele: string) => ({
                                    value: ele,
                                    label: t(entity + ':r.' + ele),
                                }))}
                            ></Checkbox.Group>
                        </FormItem>
                        <FormItem style={{ marginLeft: 100 }}>
                            <Button
                                theme="primary"
                                type="submit"
                                style={{ marginRight: 10 }}
                                onClick={() => {
                                    this.onConfirm();
                                }}
                            >
                                提交
                            </Button>
                            <Button type="reset">重置</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
