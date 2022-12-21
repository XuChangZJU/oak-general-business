import React from 'react';
import { Button, Form, Row, Col, Switch, Input, Space, Tooltip } from 'antd';

import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';
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
            folder: string;
            super: boolean;
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
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
        folder,
        super: super2,
        style,

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
                        <Form.Item
                            label="目录"
                            requiredMark
                            name="folder"
                            tooltip="目录属性应和开发目录下的对应目录名匹配，请谨慎修改"
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
                                            folder: e.target.value,
                                        });
                                    }}
                                    value={folder}
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
                            tooltip="超级用户属性可能影响程序的运行逻辑，请谨慎修改"
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

                        <Form.Item label="样式" requiredMark name="style">
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
        <PageHeader showBack={showBack} title="系统编辑">
            <div className={Style.container}>{children}</div>
        </PageHeader>
    );
}
