import React from 'react';
import ConfigUpsert from '../../../../components/config/application';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../../general-app-domain/Application/Schema';

import { EntityDict } from '../../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

type Config = WebConfig | WechatPublicConfig | WechatMpConfig;

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
            type: AppType;
        },
        {}
    >
) {
    const { oakId, config, name, type } = props.data;
    return (
        <PageHeader showBack={true} title="应用配置">
            <div className={Style.container}>
                <ConfigUpsert
                    type={type}
                    config={config}
                    entity="application"
                    entityId={oakId}
                    name={name}
                />
            </div>
        </PageHeader>
    );
}