import React from 'react';
import { Form, Radio, Button, Space, InputNumber } from 'antd';
import Style from './web.module.less';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'token',
        false,
        {
            relation: string;
            type: 'grant';
            number: number;
            period: number;
            relations: string[];
            entity: string;
            entityId: string;
        },
        {
            confirm: () => void;
            reset: () => void;
            setRelation: (value: string) => void;
            setNumber: (value: string) => void;
            setPeriod: (value: number | null) => void;
        }
    >
) {
    const { relation, type, number, period, relations, entity, entityId } =
        props.data;
    const { t, confirm, reset, setRelation, setNumber, setPeriod } =
        props.methods;

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
                            onChange={(e) => {
                                setRelation(e.target.value);
                            }}
                            options={relations?.map((ele: string) => ({
                                value: ele,
                                label: t(entity + ':r.' + ele),
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
                                    setNumber(value);
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
                                setPeriod(value);
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
                                    confirm();
                                }}
                            >
                                提交
                            </Button>
                            <Button
                                htmlType="reset"
                                onClick={() => {
                                    reset();
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
