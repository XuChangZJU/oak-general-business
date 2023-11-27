import React from 'react';
import { Input, Modal } from 'antd';
export default function Render(props) {
    const { methods, data, } = props;
    const { t, } = methods;
    const { oakFullpath, oakId, name, openSubway, onClose, } = data;
    return (<Modal title={oakId ? '编辑地铁' : '新增地铁'} open={openSubway} destroyOnClose={true} okText="确定" cancelText="取消" onOk={async () => {
            methods.execute();
            onClose();
        }} onCancel={() => {
            onClose();
        }}>
            <>
                <Input placeholder="请输入线路名称" value={name} onChange={({ target: { value } }) => {
            methods.update({ name: value });
        }}/>
            </>
        </Modal>);
}
