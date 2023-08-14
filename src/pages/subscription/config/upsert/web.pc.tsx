import React from 'react';
import ConfigUpsert from '../../../../components/config/application';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';

import { WechatPublicConfig } from '../../../../oak-app-domain/Application/Schema';

import { EntityDict } from '../../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

type Config = WechatPublicConfig;

export default function render(
    props: WebComponentProps<
        EntityDict,
        'application',
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
        <PageHeader showBack={true} title="订阅号配置">
            <div className={Style.container}>
                <ConfigUpsert
                    isService={false}
                    type="wechatPublic"
                    config={config}
                    entity="subscription"
                    entityId={oakId}
                    name={name}
                />
            </div>
        </PageHeader>
    );
}