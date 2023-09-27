import React from 'react';
import { Button, Form, Row, Col, Select, Input, Space, Tooltip } from 'antd';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';

import { EntityDict } from '../../../../oak-app-domain';
import { RowWithActions, WebComponentProps } from 'oak-frontend-base';
import { getWechatPublicTags } from '../../../../config/constants';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatPublicTag',
        false,
        {
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
            text: string;
            wechatId: number;
            sync: boolean;
            oakId: string,
        },
        {
            confirm: () => void;
            createTag: (name: string) => void;
            editTag: (id: number, name: string) => void;
        }
    >
) {
    const {
        variant,
        showBack = true,
        text,
        wechatId,
        sync,
        oakDirty,
        oakExecuting,
        oakId,
    } = props.data;
    const { t, update, navigateBack, confirm, createTag, editTag } = props.methods;

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
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <>
                                <Input
                                    value={text}
                                    onChange={(v) => update({ text: v.target.value })}
                                    placeholder='标签名称'
                                    maxLength={30}
                                />
                            </>
                        </Form.Item>

                        <Action variant={variant}>
                            <Form.Item wrapperCol={{ offset: 6 }}>
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            if (oakId) {
                                                editTag(wechatId, text);
                                                console
                                            } else {
                                                createTag(text);
                                            }

                                        }}
                                        disabled={!oakDirty || oakExecuting}
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