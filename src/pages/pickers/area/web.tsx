import React, { Component } from 'react';
import Style from './web.module.less';
import { List, Button } from 'tdesign-react';
import { ChevronRightIcon } from 'tdesign-icons-react';

const { ListItem } = List;

export default function render(this: any) {
    const { arealist } = this.state;
    if (arealist?.length > 0) {
        return (
            <List>
                {arealist.map((area: Record<string, any>) => (
                    <Button block theme="default" variant="text"  onClick={() => this.onItemClicked(area)}>
                        <ListItem key={area.id}>
                            {area.name}
                            <ChevronRightIcon />
                        </ListItem>
                    </Button>
                ))}
            </List>
        );
    }
    return (
        <div className={Style.container}>
            {this.t('common:noData')}
        </div>
    );
}
