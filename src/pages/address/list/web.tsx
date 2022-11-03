import React, { Component } from 'react';
import Style from './web.module.less';
import { List, Button } from 'antd';


export default function render(this: any) {
    const { addresses } = this.state;
    if (addresses?.length > 0) {
        return (
            <List>
                {addresses.map((address: Record<string, any>) => (
                    <List.Item key={address.id} onClick={() => this.gotoUpsert(address.id)}>
                        <List.Item.Meta
                            title={address.name}
                            description={address.areaText + address.detail}
                        />
                    </List.Item>
                ))}
            </List>
        );
    }
    return (
        <div className={Style.container}>
            {this.t('common:noData')}
            <Button
                block={false}
                ghost={false}
                loading={false}
                type="primary"
                style={{ marginTop: 10 }}
                onClick={() => this.goNewAddress()}
            >
                {this.t('common:action.create')}
            </Button>
        </div>
    );
}
