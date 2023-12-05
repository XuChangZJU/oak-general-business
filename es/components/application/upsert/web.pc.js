import React from 'react';
import { Form, Select, Input } from 'antd';
export default function Render(props) {
    const { name, description, type, typeArr, $$createAt$$, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (<Form colon={true} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
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
            <Form.Item label="应用类型" required>
                <>
                    <Select value={type} style={{ width: 120 }} disabled={$$createAt$$ > 1} options={typeArr.map((ele) => ({
            label: t(`application:v.type.${ele.value}`),
            value: ele.value,
        }))} onChange={(value) => {
            update({
                type: value,
            });
        }}/>
                </>
            </Form.Item>
        </Form>);
}
