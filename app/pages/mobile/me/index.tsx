import React, { Component } from 'react';
import { List, Modal, Typography, Button } from 'antd';
const { Title } = Typography;
import { PhoneOutlined, MinusOutlined } from '@ant-design/icons';

export default function render() {
    const { mobiles, confirmDeleteModalVisible, deleteIdx } = this.state;
    return (
        <div className='page-body'>
            <List
                grid={{ gutter: 16, column: 1 }}
                itemLayout="horizontal"
                dataSource={mobiles}
                renderItem={(item, idx) => (
                    <List.Item>
                        <div className='card'>
                            <text>{item.mobile}</text>
                            <Button
                                type='primary'
                                shape='circle'
                                icon={<MinusOutlined style={{ fontSize: 20 }} />}
                                size="large"
                                onClick={() => {
                                    this.setState({
                                        confirmDeleteModalVisible: true,
                                        deleteIdx: idx,
                                    });
                                }}
                            />
                        </div>
                    </List.Item>
                )}
            />
            <div style={{ flex: 1 }} />
            <div className='btn-box'>
                <Button size='large' type="primary" block onClick={() => this.goAddMobile()}>
                    增加
                </Button>
            </div>
            <Modal
                closable={false}
                visible={confirmDeleteModalVisible}
                onOk={async () => {
                    this.execute('remove', undefined, `${deleteIdx}`);
                    this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }}
                onCancel={() => this.setState({
                    confirmDeleteModalVisible: false,
                    deleteIdx: undefined,
                })}
                okText="确认"
                cancelText="取消"
            >
                确认删除手机号吗？
            </Modal>
        </div>
    );
}
