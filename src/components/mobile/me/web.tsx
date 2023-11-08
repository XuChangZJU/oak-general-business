import React, { useState } from 'react';
import { List, Button, Modal, Dialog } from 'antd-mobile';
import { MobileOutlined, DeleteOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import Style from './mobile.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'mobile',
        true,
        {
            mobiles?: EntityDict['mobile']['OpSchema'][];
            allowRemove: boolean;
            tokenMobileId?: string;
        },
        {
            goAddMobile: () => void;
        }
    >
) {
    const { mobiles, allowRemove, tokenMobileId } = props.data;
    const { goAddMobile, removeItem, recoverItem, execute } = props.methods;
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
                                    allowRemove && tokenMobileId !== ele.id && (
                                        <div
                                            onClick={async () => {
                                                const result =
                                                    await Dialog.confirm({
                                                        content:
                                                            '确认删除吗？删除后无法用此号码登录',
                                                    });
                                                if (result) {
                                                    removeItem(ele.id);
                                                    try {
                                                        await execute();
                                                    }
                                                    catch (err) {
                                                        recoverItem(ele.id);
                                                        throw err;
                                                    }
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
