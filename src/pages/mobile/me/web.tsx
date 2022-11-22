import React, { useState } from 'react';
import { List, Button, Modal } from 'antd';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';



export default function render(props: WebComponentProps<EntityDict, 'mobile', true, {
    mobiles?: EntityDict['mobile']['OpSchema'][],
}, {
    goAddMobile: () => Promise<void>;
}>) {
    const { mobiles } = props.data;
    const { goAddMobile, removeItem, execute } = props.methods;
    const [ idToRemove, setIdToRemove ] = useState(undefined as undefined | string);
    return (
        <div className={Style.container}>
            <List className={Style.list} split={true}>
                {mobiles?.map((ele, index) => (
                    <List.Item
                        key={index}
                        extra={
                            <div
                                onClick={() => setIdToRemove(ele.id)}
                            >
                                <DeleteOutlined />
                            </div>
                        }
                    >
                        <List.Item.Meta
                            avatar={<MobileOutlined />}
                            title={ele.mobile}
                        />
                    </List.Item>
                ))}
            </List>
            <div style={{ flex: 1 }} />
            <Button
                block
                size="large"
                type="primary"
                onClick={() => goAddMobile()}
            >
                添加
            </Button>
            <Modal
                open={!!idToRemove}
                title="确认删除手机号吗？"
                okText="确定"
                cancelText="取消"
                // content="删除后，不可恢复"
                destroyOnClose={true}
                onCancel={() => useState(undefined)}
                onOk={async () => {
                    await removeItem(idToRemove!);
                    await execute();
                    setIdToRemove(undefined);
                }}
            />
        </div>
    );
}
