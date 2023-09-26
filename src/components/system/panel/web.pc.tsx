import React from 'react';
import { Tabs } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import SystemDetail from '../detail';
import ConfigUpsert from '../../config/upsert';
import StyleUpsert from '../../config/style';
import DomainList from '../../domain/list';
import { EntityDict } from '../../../oak-app-domain';
import { Config } from '../../../types/Config';
import { Style } from '../../../types/Style';

export default function Render(props: WebComponentProps<EntityDict, 'system', false, {
    id: string;
    config: Config;
    name: string;
    style: Style;
}>) {
    const { id, config, oakFullpath, name, style } = props.data;
    const { t, update } = props.methods;

    if (id && oakFullpath) {
        return (
            <Tabs
                items={[
                    {
                        label: t('detail'),
                        key: 'detail',
                        children: (
                            <SystemDetail
                                oakId={id}
                            />
                        ),
                    },
                    {
                        label: t('config'),
                        key: 'detail',
                        children: (
                            <ConfigUpsert
                                entity="system"
                                entityId={id}
                                config={config}
                                name={name}
                            />
                        ),
                    },
                    {
                        label: t('style'),
                        key: 'detail',
                        children: (
                            <StyleUpsert
                                value={style}
                                onChange={(s) => {
                                    update({ style: s });
                                }}
                            />
                        ),
                    },
                    {
                        label: t('domain-list'),
                        key: 'domain_list',
                        children: (
                            <DomainList
                                oakPath={`${oakFullpath}.domain$system`}
                            />
                        ),
                    },
                ]}
            />
        );
    }
}