import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import Style from './web.module.less';
import OnUser from '../onUser/index';

export default function render(this: any) {
    const { relations, entity, entityId } = this.props;
    const { mobileValue, mobileValueReady, legal } = this.state;
    return (
        <div className={Style.container}>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item
                    label="手机号码"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: '手机号不能为空',
                        },
                        {
                            min: 11,
                            message: '请输入11位手机号',
                        },
                        {
                            max: 11,
                            message: '请输入11位手机号',
                        },
                    ]}
                >
                    <>
                        <Input
                            maxLength={11}
                            value={mobileValue}
                            onChange={(e) => {
                                const strValue = e.target.value;
                                this.onMobileChange(strValue);
                            }}
                            placeholder="请输入手机号码"
                            type="tel"
                        />
                    </>
                </Form.Item>
            </Form>
            {mobileValueReady && (
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={
                        this.state.oakFullpath
                            ? `${this.state.oakFullpath}.user`
                            : undefined
                    }
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakId={this.state.userId}
                />
            )}
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.onConfirm();
                            }}
                            disabled={!legal}
                        >
                            提交
                        </Button>
                        <Button htmlType="reset" onClick={() => this.onReset()}>
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
