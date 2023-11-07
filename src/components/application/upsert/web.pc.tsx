import React from 'react';
import { Button, Form, Row, Col, Select, Space, Input } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ComponentStyle from '../../../components/config/style';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'application',
        false,
        {
            name: string;
            description: string;
            variant: 'inline' | 'alone' | 'dialog';
            showBack: boolean;
            type: EntityDict['application']['Schema']['type'];
            typeArr: Array<{
                label: string;
                value: EntityDict['application']['Schema']['type'];
            }>;
            systemId: string;
            oakId: string;
            style: EntityDict['system']['Schema']['style'];
            $$createAt$$: number;
        },
        {
            confirm: () => void;
        }
    >
) {
    const {
        name,
        description,
        type,
        typeArr,
        $$createAt$$,
    } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (
        <Form
            colon={true}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                label="名称"
                required
            // name="name"
            // rules={[
            //     {
            //         required: true,
            //     },
            // ]}
            >
                <>
                    <Input
                        onChange={(e) => {
                            update({
                                name: e.target.value,
                            });
                        }}
                        value={name}
                    />
                </>
            </Form.Item>
            <Form.Item
                label="描述"
            //name="description"
            >
                <>
                    <Input.TextArea
                        onChange={(e) => {
                            update({
                                description: e.target.value,
                            });
                        }}
                        value={description}
                    />
                </>
            </Form.Item>
            <Form.Item
                label="应用类型"
                required
            // name="type"
            // rules={[
            //     {
            //         required: true,
            //     },
            // ]}
            >
                <>
                    <Select
                        value={type}
                        style={{ width: 120 }}
                        disabled={$$createAt$$ > 1}
                        options={typeArr.map(
                            (ele: { value: string }) => ({
                                label: t(
                                    `application:v.type.${ele.value}`
                                ),
                                value: ele.value,
                            })
                        )}
                        onChange={(value) => {
                            update({
                                type: value,
                            });
                        }}
                    />
                </>
            </Form.Item>
        </Form>
    );
}
