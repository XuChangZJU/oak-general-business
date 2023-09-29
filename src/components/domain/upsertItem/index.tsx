import React from 'react';
import { Button, Form, Row, Col, Switch, Input, Space, Select } from 'antd';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(props: {
    data: EntityDict['domain']['OpSchema'];
    update: <T extends keyof EntityDict['domain']['OpSchema']>(attr: T, value: EntityDict['domain']['OpSchema'][T] | undefined) => void;
}) {
    const { update, data } = props;
    return (
        <Form
            colon={true}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                label="访问域名"
                required
            // name="url"
            // rules={[
            //     {
            //         required: true,
            //     },
            // ]}
            >
                <>
                    <Input
                        placeholder="输入域名，例如：www.abc.com"
                        onChange={(e) => {
                            update('url', e.target.value);
                        }}
                        value={data.url}
                    />
                </>
            </Form.Item>
            <Form.Item
                label="请求路径"
                required
            //name="apiPath"
            >
                <>
                    <Input
                        onChange={(e) => {
                            update('apiPath', e.target.value);
                        }}
                        value={data.apiPath}
                    />
                </>
            </Form.Item>
            <Form.Item
                label="端口"
                required
            //name="port"
            >
                <>
                    <Input
                        onChange={(e) => {
                            const v = e.target.value;
                            update('port', v ? Number(v) : undefined);
                        }}
                        value={data.port}
                    />
                </>
            </Form.Item>
            <Form.Item
                //name="protocol"
                required
                label="协议"
            >
                <>
                    <Select
                        // mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择协议"
                        value={data.protocol}
                        onChange={(value: string) => {
                            update('protocol', value as EntityDict['domain']['Schema']['protocol']);
                        }}
                        options={[
                            {
                                label: 'http',
                                value: 'http',
                            },
                            {
                                label: 'https',
                                value: 'https',
                            },
                        ]}
                    />
                </>
            </Form.Item>
        </Form>
    )
}