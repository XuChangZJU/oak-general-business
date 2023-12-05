import React from 'react';
import { Form, Input, Select } from 'antd';
export default function Render(props) {
    const { update, data } = props;
    return (<Form colon={true} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="访问域名" required>
                <>
                    <Input placeholder="输入域名，例如：www.abc.com" onChange={(e) => {
            update('url', e.target.value);
        }} value={data.url}/>
                </>
            </Form.Item>
            <Form.Item label="请求路径">
                <>
                    <Input onChange={(e) => {
            update('apiPath', e.target.value);
        }} value={data.apiPath || undefined}/>
                </>
            </Form.Item>
            <Form.Item label="端口" required>
                <>
                    <Input onChange={(e) => {
            const v = e.target.value;
            update('port', v ? Number(v) : undefined);
        }} value={data.port}/>
                </>
            </Form.Item>
            <Form.Item 
    //name="protocol"
    required label="协议">
                <>
                    <Select 
    // mode="multiple"
    allowClear style={{ width: '100%' }} placeholder="请选择协议" value={data.protocol} onChange={(value) => {
            update('protocol', value);
        }} options={[
            {
                label: 'http',
                value: 'http',
            },
            {
                label: 'https',
                value: 'https',
            },
        ]}/>
                </>
            </Form.Item>
        </Form>);
}
