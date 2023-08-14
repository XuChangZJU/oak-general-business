import React from 'react';
import { Button, Form, Row, Col, Input, Space } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';

import Style from './web.module.less';


import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        false,
        {
            name: string;
            description: string;
            style: EntityDict['system']['Schema']['style'];
        },
        {
            confirm: () => void;
        }
    >
) {
    const { name, description, style } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (
        <PageHeader showBack={true} title="平台编辑">
            <div className={Style.container}>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form
                            colon={true}
                            labelCol={{ span: 4 }}
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
                            <Form.Item
                                label="描述"
                                name="description"
                            >
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
                                label="样式"
                                required
                                name="style"
                            >
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

                            <Form.Item wrapperCol={{ offset: 4 }}>
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
                        </Form>
                    </Col>
                </Row>
            </div>
        </PageHeader>
    );
}
