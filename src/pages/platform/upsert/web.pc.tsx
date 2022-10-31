import React from 'react';
import { Button, Input, Form, Row, Col } from 'antd';
import Style from './web.module.less';


export default function render(this: any) {
    const { name, description } = this.state;
    return (
        <div className={Style.container}>
            <Row>
                <Col xs={24} sm={8}>
                    <Form
                        colon={true}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item label="名称" requiredMark name="name" rules={[{
                            required: true
                        }]}>
                            <>
                                <Input
                                    onChange={(e) => {
                                        this.setUpdateData('name', e.target.value);
                                    }}
                                    value={name}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="描述" requiredMark name="description">
                            <>
                                <Input
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
                        <Form.Item wrapperCol={{ offset: 4 }}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.confirm();
                                }}
                            >
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
