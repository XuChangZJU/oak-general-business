import React from 'react';
import { Tabs } from 'antd';
import SystemDetail from '../detail';
import ConfigUpsert from '../../config/upsert';
import StyleUpsert from '../../config/style/platform';
import DomainList from '../../domain/list';
import SmsTemplateList from '../../messageTypeSmsTemplate/tab';
import ApplicationList from '../application';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { id, config, oakFullpath, name, style, application$system: applications } = props.data;
    const { t, update, addItem, removeItem } = props.methods;
    if (id && oakFullpath) {
        return (<div className={Styles.container}>
                <Tabs tabPosition='left' items={[
                {
                    label: <div className={Styles.tabLabel}>{t('detail')}</div>,
                    key: 'detail',
                    children: (<SystemDetail oakId={id} oakPath={oakFullpath}/>),
                },
                {
                    label: <div className={Styles.tabLabel}>{t('config')}</div>,
                    key: 'config',
                    children: (<ConfigUpsert entity="system" entityId={id} config={config} name={name}/>),
                },
                {
                    label: <div className={Styles.tabLabel}>{t('style')}</div>,
                    key: 'style',
                    children: (<StyleUpsert style={style} entity={'system'} entityId={id} name={name}/>),
                },
                {
                    label: <div className={Styles.tabLabel}>{t('application-list')}</div>,
                    key: 'application',
                    children: (<ApplicationList oakPath={`${oakFullpath}.application$system`} systemId={id}/>),
                },
                {
                    label: <div className={Styles.tabLabel}>{t('domain-list')}</div>,
                    key: 'domain_list',
                    children: (<DomainList oakPath={`${oakFullpath}.domain$system`} systemId={id}/>),
                },
                {
                    label: <div className={Styles.tabLabel}>{t('smsTemplate-list')}</div>,
                    key: 'smsTemplate-list',
                    children: (<SmsTemplateList oakPath={`$system-messageTypeSmsTemplateList-${id}`} oakAutoUnmount={true} systemId={id}/>),
                },
            ]}/>
            </div>);
    }
}
