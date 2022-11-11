import React from 'react';
import { Button, Form, Row, Col, Switch } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Input from '../../../components/common/input';
import Style from './web.module.less';


export default function render(this: any) {
    const { variant, showBack = true } = this.props;
    const { name, description, super: super2 } = this.state;
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
                            label="是否为超级系统"
                            requiredMark
                            name="super"
                        >
                            <>
                                <Switch
                                    checkedChildren="是"
                                    unCheckedChildren="否"
                                    checked={super2}
                                    onChange={(checked) => {
                                        this.setUpdateData('super', checked);
                                    }}
                                />
                            </>
                        </Form.Item>

                        <Action variant={variant}>
                            <Form.Item wrapperCol={{ offset: 6 }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.confirm();
                                    }}
                                >
                                    确定
                                </Button>
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
        <PageHeader showBack={showBack} title="系统编辑">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
