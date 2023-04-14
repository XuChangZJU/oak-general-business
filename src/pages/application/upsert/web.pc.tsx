import React from 'react';
import { Button, Form, Row, Col, Select, Space, Input } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';
import Style from './web.module.less';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'application',
        false,
        {
            name: string;
            description: string;
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
            type: EntityDict['application']['Schema']['type'];
            typeArr: Array<{
                label: string;
                value: EntityDict['application']['Schema']['type'];
            }>;
            systemId: string;
            oakId: string;
            style: EntityDict['system']['Schema']['style'];
        },
        {
            confirm: () => void;
        }
    >
) {
    const {
        name,
        description,
        type,
        typeArr,
        variant,
        showBack = true,
        systemId,
        oakId,
        style,
    } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
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
                            required
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
                                        update({
                                            name: e.target.value,
                                        });
                                    }}
                                    value={name}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="描述" name="description">
                            <>
                                <Input.TextArea
                                    onChange={(e) => {
                                        update({
                                            description: e.target.value,
                                        });
                                    }}
                                    value={description}
                                />
                            </>
                        </Form.Item>
                        <Form.Item
                            label="应用类型"
                            required
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
                                            label: t(
                                                `application:v.type.${ele.value}`
                                            ),
                                            value: ele.value,
                                        })
                                    )}
                                    onChange={(value) => {
                                        update({
                                            type: value,
                                        });
                                    }}
                                />
                            </>
                        </Form.Item>

                        <Form.Item label="样式" name="style">
                            <>
                                <ComponentStyle
                                    onChange={(value) => {
                                        update({
                                            style: value,
                                        });
                                    }}
                                    value={style}
                                />
                            </>
                        </Form.Item>

                        <Action variant={variant}>
                            <Form.Item wrapperCol={{ offset: 6 }}>
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            confirm();
                                        }}
                                    >
                                        确定
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            navigateBack();
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
