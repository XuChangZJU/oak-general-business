import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import {
    Form,
    Space,
    Button,
    InputNumber,
    Typography,
} from 'antd';
import UserEntityGrantShare from '../share';
import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        false,
        {
            entityId: string;
            entity: string;
            relationEntity: string;
            showBack: boolean;
            userEntityGrantId: string;
            period: number;
        },
        {
            search: (value: string) => void;
            setPeriod: (period: number) => void;
            confirm: () => void;
            setInit: () => void;
        }
    >
) {
    const { oakId, oakFullpath, entity, entityId, relationEntity, showBack = true, userEntityGrantId, period } = props.data;
    const { setPeriod, confirm, setInit } = props.methods;

    if (!!userEntityGrantId) {
        return (
            <div className={Style.container}>
                <UserEntityGrantShare
                    oakId={userEntityGrantId}
                    oakAutoUnmount={true}
                    oakPath="$userEntityGrant/upsert-userEntityGrant/detail"
                />
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        type="primary"
                        onClick={() => {
                            setInit();
                        }}
                    >
                        重新生成
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={Style.container}>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item label="有效期" required>
                    <>
                        <InputNumber
                            min={1}
                            max={30}
                            placeholder="请输入"
                            onChange={(value) => {
                                setPeriod(value!);
                            }}
                            value={period}
                            addonAfter={<Typography>天</Typography>}
                        ></InputNumber>
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
                            提交
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}