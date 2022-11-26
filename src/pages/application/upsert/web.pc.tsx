import React from 'react';
import { Button, Form, Row, Col, Select, Space, Input } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';


export default function render(this: any) {
    const { variant, showBack = true, oakId, systemId } = this.props;
    const { name, description, type, typeArr } = this.state;
    return (
        <Container variant={variant} showBack={showBack}>
            <Row>
                <Col xs={24} sm={12}>
                    <Form
                        colon={true}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item
                            label="名称"
                            requiredMark
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <>
                                <Input
                                    onChange={(e) => {
                                        this.setUpdateData(
                                            'name',
                                            e.target.value
                                        );
                                    }}
                                    value={name}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="描述" requiredMark name="description">
                            <>
                                <Input.TextArea
                                    onChange={(e) => {
                                        this.setUpdateData(
                                            'description',
                                            e.target.value
                                        );
                                    }}
                                    value={description}
                                />
                            </>
                        </Form.Item>
                        <Form.Item
                            label="应用类型"
                            requiredMark
                            name="type"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <>
                                <Select
                                    value={type}
                                    style={{ width: 120 }}
                                    disabled={!!oakId}
                                    options={typeArr.map(
                                        (ele: { value: string }) => ({
                                            label: this.t(
                                                `application:v.type.${ele.value}`
                                            ),
                                            value: ele.value,
                                        })
                                    )}
                                    onChange={(value) => {
                                        this.setUpdateData('type', value);
                                    }}
                                />
                            </>
                        </Form.Item>

                        <Action variant={variant}>
                            <Form.Item wrapperCol={{ offset: 6 }}>
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            this.confirm();
                                        }}
                                    >
                                        确定
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            this.navigateBack();
                                        }}
                                    >
                                        返回
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Action>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

function Action(props: {
    children: React.ReactNode;
    variant?: 'inline' | 'alone' | 'dialog';
}) {
    const { children, variant } = props;
    if (variant === 'dialog') {
        return null;
    }
    return (
        <>{children}</>
    )
}

function Container(props: {
    children: React.ReactNode;
    variant?: 'inline' | 'alone' | 'dialog';
    showBack?: boolean;
}) {
    const { children, variant, showBack } = props;
    if (variant === 'inline' || variant === 'dialog') {
        return <>{children}</>;
    }
    return (
        <PageHeader showBack={showBack} title="应用编辑">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
