import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import Style from './web.module.less';
import OnUser from '../onUser/index';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';

export default function Render(props: WebComponentProps<EntityDict, 'mobile', false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: string[];
    mobileValue: string;
    mobileValueReady: boolean;
    userId: string;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>) {
    const { mobileValue, mobileValueReady, relations, entity, entityId, userId,
        oakFullpath, oakExecutable } = props.data;
    const { onConfirm, onMobileChange, onReset } = props.methods;
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
                                onMobileChange(strValue);
                            }}
                            placeholder="请输入手机号码"
                            type="tel"
                        />
                    </>
                </Form.Item>
            </Form>
            {mobileValueReady && userId && (
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={oakFullpath ? `${oakFullpath}.user`
                            : undefined
                    }
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakId={userId}
                />
            )}
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                onConfirm();
                            }}
                            disabled={!oakExecutable}
                        >
                            提交
                        </Button>
                        <Button htmlType="reset" onClick={() => onReset()}>
                            重置
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
