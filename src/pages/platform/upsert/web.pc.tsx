import React, { Component } from 'react';
import { Button, Textarea, Input, Form, Radio, DatePicker, Row, Col } from 'tdesign-react';
import dayjs from 'dayjs';
import Style from './web.module.less';

const { FormItem } = Form;

export default function render(this: any) {
    const { name, description } = this.state;
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                padding: 16,
            }}
        >
            <Row>
                <Col xs={12} sm={4}>
                    <Form labelWidth="100px" colon={true}>
                        <FormItem label="名称" requiredMark>
                            <>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('name', value);
                                    }}
                                    value={name}
                                />
                            </>
                        </FormItem>
                        <FormItem label="描述" requiredMark>
                            <>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('description', value);
                                    }}
                                    value={description}
                                />
                            </>
                        </FormItem>
                        <FormItem style={{ marginLeft: 100 }}>
                            <Button
                                theme="primary"
                                onClick={() => {
                                    this.confirm();
                                }}
                            >
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
