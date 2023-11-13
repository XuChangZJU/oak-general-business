import React, { Component } from 'react';
import Style from './web.module.less';
import { List, Button } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';


export default function Render(props: WebComponentProps<EntityDict, 'address', true, {
    addresses?: any[];
}, {
    gotoUpsert: (id: string) => void;
    goNewAddress: () => void;
}>) {
    const { methods, data } = props;
    const { addresses } = data;
    if (addresses && addresses.length > 0) {
        return (
            <>
                <List>
                    {addresses.map((address: Record<string, any>) => (
                        <List.Item key={address.id} onClick={() => methods.gotoUpsert(address.id)}>
                            <List.Item.Meta
                                title={address.name}
                                description={address.areaText + address.detail}
                            />
                        </List.Item>
                    ))}
                </List>
            </>
        );
    }
    return (
        <div className={Style.container}>
            {methods.t('common::noData')}
            <Button
                block={false}
                ghost={false}
                loading={false}
                type="primary"
                style={{ marginTop: 10 }}
                onClick={() => methods.goNewAddress()}
            >
                {methods.t('common::action.create')}
            </Button>
        </div>
    );
}
