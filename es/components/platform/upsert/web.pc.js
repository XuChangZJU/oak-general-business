import React from 'react';
import { Form, Input } from 'antd';
export default function Render(props) {
    const { name, description, style } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (<Form colon={true} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="名称" required>
                <>
                    <Input onChange={(e) => {
            update({
                name: e.target.value,
            });
        }} value={name}/>
                </>
            </Form.Item>
            <Form.Item label="描述">
                <>
                    <Input.TextArea onChange={(e) => {
            update({
                description: e.target.value,
            });
        }} value={description}/>
                </>
            </Form.Item>       
        </Form>);
}
