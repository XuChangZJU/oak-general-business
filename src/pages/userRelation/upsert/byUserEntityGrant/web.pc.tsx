import React, { useState } from 'react';
import { Form, Radio, Button, Alert, InputNumber, Space, Modal } from 'antd';
import UserEntityGrantDetail from '../../../../pages/userEntityGrant/detail';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';

import Style from './web.module.less';

export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', false, {
    relations: string[];
    period: number;
    userEntityGrant: EntityDict['userEntityGrant']['OpSchema'];
    userEntityGrantId: string;
}, {
    confirm: () => Promise<void>;
    onBack: () => void;
    setInit: () => void;
    setPeriod: (p: number) => void;
}>) {
    const { relations, userEntityGrant, userEntityGrantId, period } = props.data;
    const { relation, type, number, entity } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod } = props.methods;

    const P = !!userEntityGrantId ? (
        <>
            <Alert
                showIcon
                message="请将二维码发给待分享权限的用户扫描"
                type="info"
                style={{ marginBottom: 16 }}
            />
            <UserEntityGrantDetail
                showBack={false}
                oakId={userEntityGrantId}
                oakAutoUnmount={true}
                oakPath="$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail"
            ></UserEntityGrantDetail>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button type="primary" onClick={() => setInit()}>
                    重新生成
                </Button>
            </div>
        </>
    ) : (
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
            <Form.Item
                label="权限"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group
                    value={relation}
                    onChange={({ target }) => {
                        const { value } = target;
                        update({ relation: value });
                    }}
                    options={relations?.map((ele: string) => ({
                        value: ele,
                        label: t(entity + ':r.' + ele) || ele,
                    }))}
                />
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
                            update({ number: value });
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
                    onChange={(value) => setPeriod(value!)}
                    addonAfter="分钟"
                />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                    <Button type="primary" onClick={() => confirm()}>
                        提交
                    </Button>
                    <Button onClick={() => onBack()}>返回</Button>
                </Space>
            </Form.Item>
        </Form>
    );
    return (
        <div className={Style.container}>
            {P}
        </div>
    );
}
