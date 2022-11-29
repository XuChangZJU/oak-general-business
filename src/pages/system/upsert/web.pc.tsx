import React from 'react';
import { Button, Form, Row, Col, Switch, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
import { set, get } from 'oak-domain/lib/utils/lodash';


import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'system',
        false,
        {
            name: string;
            description: string;
            super: boolean;
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
            domain: string[];
        },
        {
            confirm: () => void;
        }
    >
) {
    const {
        name,
        description,
        super: super2,
        domain = [],

        variant,
        showBack = true,
    } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;

    const setDomainItem = (path: string, value: string) => {
        update({
            domain: set(domain || [], path, value),
        });
    };

    const removeDomainItem = (index: number) => {
        domain.splice(index, 1);
        update({
            domain: [...domain],
        });
    };

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
                                        update({
                                            name: e.target.value,
                                        });
                                    }}
                                    value={name}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="描述" requiredMark name="description">
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
                                        update({
                                            super: checked,
                                        });
                                    }}
                                />
                            </>
                        </Form.Item>

                        {domain?.map((ele, index) => (
                            <Form.Item
                                label={`域名${index + 1}`}
                                requiredMark
                                name={`domain${index + 1}`}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Space.Compact block key={`domain_${index}`}>
                                    <Input
                                        placeholder="填写域名，例如: www.abc.com"
                                        value={ele}
                                        onChange={(e) => {
                                            setDomainItem(
                                                `${index}`,
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <MinusCircleOutlined
                                        onClick={() => {
                                            removeDomainItem(index)
                                        }}
                                        style={{ marginLeft: 5 }}
                                    />
                                </Space.Compact>
                            </Form.Item>
                        ))}

                        <Form.Item wrapperCol={{ offset: 6 }}>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    const length = domain?.length || 0; //新增第几项
                                    setDomainItem(`${length}`, '');
                                }}
                                block
                                icon={<PlusOutlined />}
                            >
                                添加域名
                            </Button>
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
