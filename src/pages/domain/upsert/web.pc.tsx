import React from 'react';
import { Button, Form, Row, Col, Switch, Input, Space, Select } from 'antd';

import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';


import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'domain',
        false,
        {
            id: string;
            systemId: string;
            url: string;
            apiPath: string;
            port: number;
            protocol: EntityDict['domain']['Schema']['protocol'];
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
        },
        {
            confirm: () => void;
        }
    >
) {
    const {
        systemId,
        url,
        apiPath,
        port,
        protocol,

        variant,
        showBack = true,
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
                            label="访问域名"
                            requiredMark
                            name="url"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <>
                                <Input
                                    placeholder="输入域名，例如：www.abc.com"
                                    onChange={(e) => {
                                        update({
                                            url: e.target.value,
                                        });
                                    }}
                                    value={url}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="请求路径" requiredMark name="apiPath">
                            <>
                                <Input
                                    onChange={(e) => {
                                        update({
                                            apiPath: e.target.value,
                                        });
                                    }}
                                    value={apiPath}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="端口" requiredMark name="port">
                            <>
                                <Input
                                    type='number'
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        update({
                                            port: v ? Number(v) : undefined, 
                                        });
                                    }}
                                    value={port}
                                />
                            </>
                        </Form.Item>
                        <Form.Item name="protocol" label="协议">
                            <>
                                <Select
                                    // mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="请选择协议"
                                    value={protocol}
                                    onChange={(value: string) => {
                                        update({
                                            protocol:
                                                value as EntityDict['domain']['Schema']['protocol'],
                                        });
                                    }}
                                    options={[
                                        {
                                            label: 'http',
                                            value: 'http',
                                        },
                                        {
                                            label: 'https',
                                            value: 'https',
                                        },
                                    ]}
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
        <PageHeader showBack={showBack} title="系统编辑">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
