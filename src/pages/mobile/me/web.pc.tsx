import React, { useState } from 'react';
import { List, Button, Modal } from 'antd';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import PageHeader from '../../../components/common/pageHeader';
import MobileLogin from '../../../pages/mobile/login';


export default function render(
    props: WebComponentProps<
        EntityDict,
        'mobile',
        true,
        {
            mobiles?: EntityDict['mobile']['OpSchema'][];
            allowRemove: boolean;
            showBack: boolean;
        },
        {
            goAddMobile: () => void;
        }
    >
) {
    const { mobiles, allowRemove, showBack = false } = props.data;
    const { goAddMobile, removeItem, execute, sub } = props.methods;
    const [open, setOpen] = useState(false);
    const eventLoggedIn = `user:info:login:${Date.now()}`;

    return (
        <PageHeader showBack={showBack} title="我的手机号">
            <div className={Style.container}>
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    绑定
                </Button>
                <List bordered className={Style.list}>
                    {mobiles?.map((ele, index) => (
                        <List.Item
                            key={index}
                            extra={
                                allowRemove && (
                                    <div
                                        onClick={() => {
                                            const modal = Modal!.confirm!({
                                                title: `确认删除吗？删除后无法用此号码登录`,
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: async (e) => {
                                                    removeItem(ele.id);
                                                    await execute();
                                                    modal!.destroy!();
                                                },
                                                onCancel: (e) => {
                                                    modal!.destroy!();
                                                },
                                            });
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </div>
                                )
                            }
                        >
                            <List.Item.Meta
                                avatar={<MobileOutlined />}
                                title={ele.mobile}
                            ></List.Item.Meta>
                        </List.Item>
                    ))}
                </List>
            </div>
            <Modal
                title="绑定手机号"
                open={open}
                destroyOnClose={true}
                footer={null}
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <MobileLogin
                    callback={() => {
                        setOpen(false);
                    }}
                    oakPath="$mobile/me-mobile/login"
                    oakAutoUnmount={true}
                />
            </Modal>
        </PageHeader>
    );
}
