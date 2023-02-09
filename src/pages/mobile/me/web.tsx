import React, { useState } from 'react';
import { List, Button, Modal, Dialog } from 'antd-mobile';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import Style from './mobile.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'mobile',
        true,
        {
            mobiles?: EntityDict['mobile']['OpSchema'][];
            allowRemove: boolean;
        },
        {
            goAddMobile: () => void;
        }
    >
) {
    const { mobiles, allowRemove } = props.data;
    const { goAddMobile, removeItem, execute } = props.methods;
    return (
        <div className={Style.container}>
            {mobiles && mobiles.length > 0 ? (
                <>
                    <List className={Style.list}>
                        {mobiles?.map((ele, index) => (
                            <List.Item
                                key={index}
                                prefix={<MobileOutlined />}
                                extra={
                                    allowRemove && (
                                        <div
                                            onClick={async () => {
                                                const result =
                                                    await Dialog.confirm({
                                                        content:
                                                            '确认删除吗？删除后无法用此号码登录',
                                                    });
                                                if (result) {
                                                    removeItem(ele.id);
                                                    await execute();
                                                }
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </div>
                                    )
                                }
                            >
                                {ele.mobile}
                            </List.Item>
                        ))}
                    </List>
                    <div style={{ flex: 1 }} />
                </>
            ) : (
                <div className={Style.noData}>
                    <span>尚未绑定手机号</span>
                </div>
            )}

            <Button
                block
                size="large"
                color="primary"
                onClick={() => goAddMobile()}
            >
                绑定
            </Button>
        </div>
    );
}
