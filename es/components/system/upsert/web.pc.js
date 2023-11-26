import React from 'react';
import { Form, Switch, Input } from 'antd';
export default function Render(props) {
    const { name, description, folder, super: super2, } = props.data;
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
            <Form.Item label="目录" required 
    // name="folder"
    tooltip="目录属性应和开发目录下的对应目录名匹配，请谨慎修改" rules={[
            {
                required: true,
            },
        ]}>
                <>
                    <Input onChange={(e) => {
            update({
                folder: e.target.value,
            });
        }} value={folder}/>
                </>
            </Form.Item>
            <Form.Item label="描述" required>
                <>
                    <Input.TextArea onChange={(e) => {
            update({
                description: e.target.value,
            });
        }} value={description}/>
                </>
            </Form.Item>
            <Form.Item label="是否为超级系统" required tooltip="超级用户属性可能影响程序的运行逻辑，请谨慎修改">
                <>
                    <Switch checkedChildren="是" unCheckedChildren="否" checked={super2} onChange={(checked) => {
            update({
                super: checked,
            });
        }}/>
                </>
            </Form.Item>
        </Form>);
}
