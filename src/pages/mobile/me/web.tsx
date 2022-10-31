import React from 'react';
import { List, Button, Modal } from 'antd';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import Style from './web.module.less';



export default function render(this: any) {
    const { mobiles, confirmDeleteModalVisible, deleteIdx } = this.state;
    return (
        <div className={Style.container}>
            <List className={Style.list} split={true}>
                {mobiles?.map((ele: any, index: number) => (
                    <List.Item
                        key={index}
                        extra={
                            <div
                                onClick={() => {
                                    this.setState({
                                        confirmDeleteModalVisible: true,
                                        deleteIdx: index,
                                    });
                                }}
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
                onClick={() => this.goAddMobile()}
            >
                添加
            </Button>
            <Modal
                open={confirmDeleteModalVisible}
                title="确认删除手机号吗？"
                okText="确定"
                cancelText="取消"
                // content="删除后，不可恢复"
                destroyOnClose={true}
                onCancel={() => {
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
                onOk={async () => {
                    await this.addOperation({
                        action: 'remove',
                        data: {},
                        filter: {
                            id: mobiles[deleteIdx].id,
                        },
                    });
                    await this.execute();
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
            />
        </div>
    );
}
