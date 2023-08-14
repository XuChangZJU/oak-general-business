import React from 'react';
import { List } from 'antd-mobile';
import Style from './web.module.less';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';


export default function render(props: WebComponentProps<EntityDict, 'area', true, {
    areas?: EntityDict['area']['OpSchema'][];
}, {
    onItemClicked: (area: EntityDict['area']['OpSchema']) => Promise<void>;
}>) {
    const {
        data: { areas },
        methods: { onItemClicked, t }
    } = props;
    if (areas && areas.length > 0) {
        return (
            <List>
                {areas.map((area) => (
                    <List.Item
                        key={area.id}
                        onClick={() => onItemClicked(area)}
                        arrow
                    >
                        {area.name}
                    </List.Item>
                ))}
            </List>
        );
    }
    return (
        <div className={Style.container}>
            {t('common:noData')}
        </div>
    );
}
