import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs } from 'antd';
import ApplicationDetail from '../detail';
import ConfigUpsert from '../../config/application';
import StyleUpsert from '../../config/style/platform';
import TemplateList from '../../messageTypeTemplateId/list';
import Styles from './web.pc.module.less';
import WechatMenu from '../../wechatMenu';
import UserWechatPublicTag from '../../userWechatPublicTag';
import WechatPublicTag from '../..//wechatPublicTag/list';
import WechatPublicAutoReply from '../..//wechatPublicAutoReply';
export default function Render(props) {
    const { id, config, oakFullpath, name, style, type } = props.data;
    const { t, update } = props.methods;
    const [tabKey, setTabKey] = useState('detail');
    const items = [
        {
            label: _jsx("div", { className: Styles.tabLabel, children: t('detail') }),
            key: 'detail',
            children: (_jsx(ApplicationDetail, { oakId: id, oakPath: oakFullpath })),
        },
        {
            label: _jsx("div", { className: Styles.tabLabel, children: t('config') }),
            key: 'config',
            children: (_jsx(ConfigUpsert, { entity: "application", entityId: id, config: config || {}, name: name, type: config?.type })),
        },
        {
            label: _jsx("div", { className: Styles.tabLabel, children: t('style') }),
            key: 'style',
            children: (_jsx(StyleUpsert, { style: style, entity: 'platform', entityId: id, name: name })),
        },
    ];
    if (type === 'wechatPublic') {
        items.push({
            label: _jsx("div", { className: Styles.tabLabel, children: t('menu') }),
            key: 'menu',
            children: (_jsx(WechatMenu, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-menu-${id}`, tabKey: tabKey }))
        }, {
            label: _jsx("div", { className: Styles.tabLabel, children: t('autoReply') }),
            key: 'autoReply',
            children: (_jsx(WechatPublicAutoReply, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-autoReply-${id}` }))
        }, {
            label: _jsx("div", { className: Styles.tabLabel, children: t('tag') }),
            key: 'tag',
            children: (_jsx(WechatPublicTag, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-tag-${id}` }))
        }, {
            label: _jsx("div", { className: Styles.tabLabel, children: t('user') }),
            key: 'user',
            children: (_jsx(UserWechatPublicTag, { oakAutoUnmount: true, applicationId: id, oakPath: `$application-panel-user-${id}` }))
        }, {
            label: _jsx("div", { className: Styles.tabLabel, children: t('template') }),
            key: 'template',
            children: (_jsx(TemplateList, { oakAutoUnmount: true, oakPath: `templateUpsert-ApplicationId:${id}`, applicationId: id })),
        });
    }
    if (id && oakFullpath) {
        return (_jsx("div", { className: Styles.container, children: _jsx(Tabs, { tabPosition: 'left', onChange: (key) => {
                    setTabKey(key);
                }, items: items, style: { height: 520 } }) }));
    }
}
