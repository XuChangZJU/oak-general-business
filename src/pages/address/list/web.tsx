import React, { Component } from 'react';
import Style from './web.module.less';
import { List, Button } from 'tdesign-react';

const { ListItem, ListItemMeta } = List;


export default function render(this: any) {
    const { addresses } = this.state;
    if (addresses?.length > 0) {
        return (
            <List>
                {addresses.map((address: Record<string, any>) => (
                    <ListItem key={address.id}>
                        <ListItemMeta title={address.name} description={address.areaText + address.detail} />
                    </ListItem>
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
                shape="rectangle"
                size="medium"
                type="button"
                variant="base"
                style={{ marginTop: 10 }}
                onClick={() => this.goNewAddress()}
            >
                {this.t('common:action.create')}
            </Button>
        </div>
    );
}
