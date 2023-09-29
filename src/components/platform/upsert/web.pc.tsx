import React from 'react';
import { Button, Form, Row, Col, Input, Space } from 'antd';

import Style from './web.module.less';


import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        false,
        {
            name: string;
            description: string;
            style: EntityDict['system']['Schema']['style'];
        },
        {
            confirm: () => void;
        }
    >
) {
    const { name, description, style } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (
        <Form
            colon={true}
            labelCol={{ span: 4 }}
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
            // name="description"
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
        </Form>
    );
}
