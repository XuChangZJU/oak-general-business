import React from 'react';
import { Tabs } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import ApplicationDetail from '../detail';
import ConfigUpsert from '../../config/application';
import StyleUpsert from '../../config/style/platform';
import { EntityDict } from '../../../oak-app-domain';
import { Style } from '../../../types/Style';
import Styles from './web.pc.module.less';

export default function Render(props: WebComponentProps<EntityDict, 'application', false, {
    id: string;
    config: EntityDict['application']['OpSchema']['config'];
    name: string;
    style: Style;
}>) {
    const { id, config, oakFullpath, name, style } = props.data;
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
                                <ApplicationDetail
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
                                    entity="application"
                                    entityId={id}
                                    config={config || {}}
                                    name={name}
                                    type={config?.type}
                                />
                            ),
                        },
                        {
                            label: <div className={Styles.tabLabel}>{t('style')}</div>,
                            key: 'style',
                            children: (
                                <StyleUpsert
                                    style={style}
                                    entity={'platform'}
                                    entityId={id}
                                    name={name}
                                />
                            ),
                        },
                    ]}
                />
            </div>
        );
    }
}