import React from 'react';
import { List } from 'antd';
import Style from './web.module.less';


export default function render(this: any) {
    const { areas } = this.state;
    if (areas?.length > 0) {
        return (
            <List>
                {areas.map((area: Record<string, any>) => (
                    <List.Item
                        key={area.id}
                        onClick={() => this.onItemClicked(area)}
                    >
                        {area.name}
                    </List.Item>
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
