import React from 'react';
import { Form, Radio, Button, Space, InputNumber } from 'antd';
import Style from './web.module.less';

export default function render(this: any) {
    const { relation, type, number, period } = this.state;
    const { relations, entity, entityId } = this.props;

    return (
        <div className={Style.pageWithPadding}>
            <div className={Style.formContainer}>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                    <Form.Item
                        label="权限"
                        rules={[
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ]}
                    >
                        <Radio.Group
                            value={relation}
                            onChange={(value) => {
                                this.setRelation(value);
                            }}
                            options={relations?.map((ele: string) => ({
                                value: ele,
                                label:
                                    (this.t && this.t(entity + ':r.' + ele)) ||
                                    ele,
                            }))}
                        ></Radio.Group>
                    </Form.Item>
                    {type === 'grant' && (
                        <Form.Item
                            label="人数"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择分享的目标人数',
                                },
                            ]}
                        >
                            <Radio.Group
                                value={number}
                                onChange={({ target }) => {
                                    const { value } = target;
                                    this.setNumber(value);
                                }}
                                options={[
                                    { value: 1, label: '单次' },
                                    { value: 10000, label: '不限次' },
                                ]}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="时效"
                        rules={[
                            {
                                required: true,
                                message: '请选择一个时效',
                            },
                        ]}
                    >
                        <InputNumber
                            min={1}
                            max={15}
                            value={period}
                            onChange={(value) => {
                                this.setState({
                                    period: value,
                                });
                            }}
                            addonAfter="分钟"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                htmlType="submit"
                                type="primary"
                                onClick={() => {
                                    this.confirm();
                                }}
                            >
                                提交
                            </Button>
                            <Button
                                htmlType="reset"
                                onClick={() => {
                                    this.reset();
                                }}
                            >
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
