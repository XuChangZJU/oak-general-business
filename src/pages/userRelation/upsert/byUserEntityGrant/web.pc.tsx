import React from 'react';
import { Form, Radio, Button, Alert, InputNumber } from 'antd';
import Style from './web.module.less';

export default function render(this: any) {
    const { relation, period, type, number } = this.state;
    const { relations, entity, oakId } = this.props;
    
    if (oakId) {
        return <div>{oakId}</div>;
    }
    return (
        <div className={Style.pageWithPadding}>
            <Alert message="提交权限后，请将二维码发给待分享权限的用户扫描" type="success" />
            <div className={Style.formContainer}>
                <Form>
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
                            onChange={({ target }) => {
                                const { value } = target;
                                this.setRelation(value);
                            }}
                            options={relations.map((ele: string) => ({
                                value: ele,
                                label:
                                    (this.t && this.t(entity + ':r.' + ele)) || ele,
                            }))}
                        />
                    </Form.Item>
                    {type === 'grant' && <Form.Item
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
                                { value: 10000, label: '不限次' }
                            ]}
                        />
                    </Form.Item>}
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
                    <Form.Item style={{ marginLeft: 100 }}>
                        <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                this.confirm();
                            }}
                        >
                            提交
                        </Button>
                        <Button
                            onClick={() => {
                                this.onBack();
                            }}
                        >
                            返回
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
