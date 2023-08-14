import React from 'react';
import { Button, Form, Row, Col, Select, Input, Space, Tooltip } from 'antd';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';

import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import { getWechatPublicTags } from '../../../../config/constants';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'system',
        false,
        {
            text: string;
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
        },
        {
            confirm: () => void;
        }
    >
) {
    const {
        text,
        variant,
        showBack = true,
    } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;

    const WechatPublicTags = getWechatPublicTags();
    const TagOptions = Object.keys(WechatPublicTags).map(
        ele => ({
            label: WechatPublicTags[ele],
            value: WechatPublicTags[ele],
        })
    );

    return (
        <PageHeader showBack={true} title="微信公众号TAG信息">
            <Row>
                <Col xs={24} sm={12}>
                    <Form
                        colon={true}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item
                            label="TAG名称"
                            required
                            name="text"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <>
                                <Select
                                    value={text}
                                    onChange={(v) => update({ text: v })}
                                    options={TagOptions}
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
        </PageHeader>
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