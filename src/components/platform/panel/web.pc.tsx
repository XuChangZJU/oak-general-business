import React from 'react';
import { Tabs } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import Styles from './web.pc.module.less';
import ConfigUpsert from '../../config/upsert';
import StyleUpsert from '../../config/style';
import PlatformDetail from '../detail';
import PlatformSystem from '../system';
import { Style } from '../../../types/Style';
import { Config } from '../../../types/Config';

export default function render(props: WebComponentProps<EntityDict, 'platform', false, {
    id: string;
    name: string;
    config: Config;
    style: Style;
}>) {
    const { id, name, config, oakFullpath, style } = props.data;
    const { t, update } = props.methods;

    if (id && oakFullpath) {
        return (
            <div className={Styles.container}>
                <Tabs
                    tabPosition='left'
                    items={[
                        {
                            label: <div className={Styles.tabLabel}>{t('detail')}</div>,
                            key: 'detail',
                            children: (
                                <PlatformDetail
                                    oakId={id}
                                    oakPath={oakFullpath}
                                />
                            ),
                        },
                        {
                            label: <div className={Styles.tabLabel}>{t('config')}</div>,
                            key: 'config',
                            children: (
                                <ConfigUpsert
                                    entity="platform"
                                    entityId={id}
                                    config={config}
                                    name={name}
                                />
                            ),
                        },
                        {
                            label: <div className={Styles.tabLabel}>{t('style')}</div>,
                            key: 'style',
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
                            label: <div className={Styles.tabLabel}>{t('system-list')}</div>,
                            key: 'system',
                            children: (
                                <PlatformSystem
                                    oakPath={`${oakFullpath}.system$platform`}
                                    platformId={id}
                                />
                            ),
                        },
                    ]}
                />
            </div>
        );
    }

    return null;
}