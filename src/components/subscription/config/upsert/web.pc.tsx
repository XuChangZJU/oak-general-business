import React from 'react';
import ConfigUpsert from '../../../../components/config/application';

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
        <ConfigUpsert
            isService={false}
            type="wechatPublic"
            config={config}
            entity="subscription"
            entityId={oakId}
            name={name}
        />
    );
}