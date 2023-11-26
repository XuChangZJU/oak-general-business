import React from 'react';
import { Form, Space, Button, InputNumber, Typography, AutoComplete, } from 'antd';
import ParasiteDetail from '../detail';
export default function Render(props) {
    const { methods, data } = props;
    const { entity, entityId, relation, period, parasiteId, options, nameLabel, nameRequired, } = props.data;
    const { setPeriod, confirm, setInit, onSelect, onSearch, setSearchValue } = methods;
    if (!!parasiteId) {
        return (<>
                <ParasiteDetail oakId={parasiteId} oakAutoUnmount={true} oakPath="$parasite/upsert-parasite/detail"/>
                <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                    <Button type="primary" onClick={() => {
                setInit();
            }}>
                        重新生成
                    </Button>
                </div>
            </>);
    }
    return (<>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item label={nameLabel || '名称'} required={nameRequired}>
                    <>
                        <AutoComplete options={options} style={{ width: 200 }} onSelect={onSelect} onSearch={(text) => onSearch(text)} placeholder="请输入" onChange={(value) => {
            setSearchValue(value);
        }}/>
                    </>
                </Form.Item>
                <Form.Item label="有效期" required>
                    <>
                        <InputNumber min={1} max={30} placeholder="请输入" onChange={(value) => {
            setPeriod(value);
        }} value={period} addonAfter={<Typography>天</Typography>}></InputNumber>
                    </>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button type="primary" onClick={() => {
            confirm();
        }}>
                            提交
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>);
}
