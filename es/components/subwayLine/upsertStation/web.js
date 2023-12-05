import React from 'react';
import { Input, Modal } from 'antd';
export default function Render(props) {
    const { methods, data, } = props;
    const { t, } = methods;
    const { oakFullpath, oakId, name, openStation, onClose, subwayId, } = data;
    return (<Modal title={oakId ? '编辑站点' : '新增站点'} open={openStation} destroyOnClose={true} okText="确定" cancelText="取消" onOk={async () => {
            // if (!subwayId) {
            // methods.update({ subwayId, });
            // }
            methods.execute();
            onClose();
        }} onCancel={() => {
            onClose();
        }}>
            <>
                <Input placeholder="请输入站点名称" value={name} onChange={({ target: { value } }) => {
            methods.update({ name: value });
        }}/>
            </>
        </Modal>);
}
