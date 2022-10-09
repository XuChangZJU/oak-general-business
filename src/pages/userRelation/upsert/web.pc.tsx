import React, { ReactElement } from 'react';
import {
    Form,
    Input,
    Row,
    Col,
    Checkbox,
    Button,
} from 'tdesign-react';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
const { FormItem } = Form;

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
                <Row gutter={16}>
                    <Col span={8}>
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
                                    maxlength={11}
                                    value={mobile}
                                    align="left"
                                    placeholder="请输入内容"
                                    size="medium"
                                    type="tel"
                                />
                            </FormItem>
                            <FormItem
                                initialData="12345678"
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
                                    onChange={(value) => {
                                        this.setUpdateData('password', value);
                                    }}
                                    align="left"
                                    placeholder="不少于八位"
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
                                    options={relationArr2.map((ele) => ({
                                        value: ele,
                                        label:
                                            (this.t &&
                                                this.t(entity + ':r.' + ele)) ||
                                            ele,
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
                                <Button theme="default" type="reset">
                                    重置
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        </PageHeader>
    );
}
