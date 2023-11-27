import React from 'react';
import { Button, Form, Row, Col, Space, Input } from 'antd';
export default function Render(props) {
    const { name, description, entityId, entity, oakId, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (<Row>
            <Col xs={24} sm={12}>
                <Form colon={true} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                    <Form.Item label="名称" required name="name" rules={[
            {
                required: true,
            },
        ]}>
                        <>
                            <Input onChange={(e) => {
            update({
                name: e.target.value,
            });
        }} value={name}/>
                        </>
                    </Form.Item>
                    <Form.Item label="描述" required name="description">
                        <>
                            <Input.TextArea onChange={(e) => {
            update({
                description: e.target.value,
            });
        }} value={description}/>
                        </>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Space>
                            <Button type="primary" onClick={() => {
            confirm();
        }}>
                                确定
                            </Button>
                            <Button onClick={() => {
            navigateBack();
        }}>
                                返回
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>);
}
