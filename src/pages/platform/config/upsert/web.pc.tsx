import React from 'react';
import ConfigUpsert from '../../../../components/config/upsert';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';
import { Config } from '../../../../types/Config';

import { EntityDict } from '../../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        false,
        {
            name: string;
            description: string;
            oakId: string;
            config: Config;
        },
        {}
    >
) {
    const { oakId, config, name } = props.data;
    return (
        <PageHeader showBack={true} title="平台配置">
            <div className={Style.container}>
                <ConfigUpsert
                    config={config}
                    entity="platform"
                    entityId={oakId}
                    name={name}
                />
            </div>
        </PageHeader>
    );
}