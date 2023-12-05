import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import ApplicationDetail from '../detail';
import ConfigUpsert from '../../config/application';
import StyleUpsert from '../../config/style/platform';
import TemplateList from '../../messageTypeTemplate/list';
import { EntityDict } from '../../../oak-app-domain';
import { Style } from '../../../types/Style';
import Styles from './web.pc.module.less';
import WechatMenu from '../../wechatMenu';
import UserWechatPublicTag from '../../userWechatPublicTag';
import WechatPublicTag from '../..//wechatPublicTag/list';
import WechatPublicAutoReply from '../../wechatPublicAutoReply';

export default function Render(props: WebComponentProps<EntityDict, 'application', false, {
    id: string;
    config: EntityDict['application']['OpSchema']['config'];
    name: string;
    style: Style;
    type: string;
}>) {
    const { id, config, oakFullpath, name, style, type } = props.data;
    const { t, update } = props.methods;
    const [tabKey, setTabKey] = useState('detail');
    const items: TabsProps['items'] = [
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
    ];
    if (type === 'wechatPublic') {
        items.push(
            {
                label: <div className={Styles.tabLabel}>{t('menu')}</div>,
                key: 'menu',
                children: (
                    <WechatMenu
                        oakAutoUnmount={true}
                        applicationId={id}
                        oakPath={`$application-panel-menu-${id}`}
                        tabKey={tabKey}
                    />
                ),
            },
            {
                label: <div className={Styles.tabLabel}>{t('autoReply')}</div>,
                key: 'autoReply',
                children: (
                    <WechatPublicAutoReply
                        oakAutoUnmount={true}
                        applicationId={id}
                        oakPath={`$application-panel-autoReply-${id}`}
                    />
                ),
            },
            {
                label: <div className={Styles.tabLabel}>{t('tag')}</div>,
                key: 'tag',
                children: (
                    <WechatPublicTag
                        oakAutoUnmount={true}
                        applicationId={id}
                        oakPath={`$application-panel-tag-${id}`}
                    />
                ),
            },
            {
                label: <div className={Styles.tabLabel}>{t('user')}</div>,
                key: 'user',
                children: (
                    <UserWechatPublicTag
                        oakAutoUnmount={true}
                        applicationId={id}
                        oakPath={`$application-panel-user-${id}`}
                    />
                ),
            },
            {
                label: <div className={Styles.tabLabel}>{t('template')}</div>,
                key: 'template',
                children: (
                    <TemplateList
                        oakAutoUnmount={true}
                        oakPath={`templateUpsert-wechatPublic-ApplicationId:${id}`}
                        applicationId={id}
                    />
                ),
            }
        );
    }
    else if (type === 'wechatMp') {
        items.push({
            label: <div className={Styles.tabLabel}>{t('template')}</div>,
            key: 'template',
            children: (
                <TemplateList
                    oakAutoUnmount={true}
                    oakPath={`templateUpsert-wechatMp-ApplicationId:${id}`}
                    applicationId={id}
                />
            ),
        });
    }
    if (id && oakFullpath) {
        return (
            <Tabs
                tabPosition="left"
                onChange={(key) => {
                    setTabKey(key);
                }}
                items={items}
                style={{ height: 520 }}
            />
        );
    }
}