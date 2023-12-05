import React, { useState } from 'react';
import { List, Button, Modal, Row, Col } from 'antd';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import MobileLogin from '../login';
export default function render(props) {
    const { mobiles, allowRemove, tokenMobileId, showBack = false } = props.data;
    const { goAddMobile, removeItem, recoverItem, execute, subEvent } = props.methods;
    const [open, setOpen] = useState(false);
    const eventLoggedIn = `user:info:login:${Date.now()}`;
    return (<>
            <Button type="primary" onClick={() => {
            setOpen(true);
        }} style={{ marginBottom: 16 }}>
                绑定
            </Button>
            <Row>
                <Col xs={24} sm={12}>
                    <List bordered>
                        {mobiles?.map((ele, index) => (<List.Item key={index} extra={allowRemove &&
                tokenMobileId !== ele.id && (<div onClick={() => {
                    const modal = Modal.confirm({
                        title: `确认删除吗？删除后无法用此号码登录`,
                        okText: '确定',
                        cancelText: '取消',
                        onOk: async (e) => {
                            removeItem(ele.id);
                            try {
                                await execute();
                            }
                            catch (err) {
                                recoverItem(ele.id);
                                throw err;
                            }
                            modal.destroy();
                        },
                        onCancel: (e) => {
                            modal.destroy();
                        },
                    });
                }}>
                                            <DeleteOutlined />
                                        </div>)}>
                                <List.Item.Meta avatar={<MobileOutlined />} title={ele.mobile}></List.Item.Meta>
                            </List.Item>))}
                    </List>
                </Col>
            </Row>
            <Modal title="绑定手机号" open={open} destroyOnClose={true} footer={null} onCancel={() => {
            setOpen(false);
        }}>
                <div style={{ padding: 16 }}>
                    <MobileLogin callback={() => {
            setOpen(false);
        }} oakPath="$mobile/me-mobile/login" oakAutoUnmount={true}/>
                </div>
            </Modal>
        </>);
}
