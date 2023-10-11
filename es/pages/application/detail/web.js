import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, Card, Descriptions, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
import MessageTypeTemplateIdList from '../../../components/messageTypeTemplateId/list';
import WechatMenu from '../../../components/wechatMenu';
import UserWechatPublicTag from '../../../components/userWechatPublicTag';
import WechatPublicTag from '../../../components/wechatPublicTag/list';
import WechatPublicAutoReply from '../../../components/wechatPublicAutoReply';
export default function Render(props) {
    const { oakId, tabValue, config, name, description, type, system } = props.data;
    const { t, navigateBack, onTabClick, goWechatPublicTagList } = props.methods;
    const [tabKey, setTabKey] = useState('');
    const Actions = [];
    const items = [
        {
            label: '应用概览',
            key: 'detail',
            children: (_jsxs(Descriptions, { column: 1, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('application:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('application:attr.description'), children: description }), _jsx(Descriptions.Item, { label: t('application:attr.type'), children: t(`application:v.type.${type}`) }), _jsx(Descriptions.Item, { label: t('application:attr.system') +
                            t('system:attr.name'), children: system?.name })] })),
        },
    ];
    if (['wechatPublic', 'wechatMp'].includes(type)) {
        items.push({
            label: '模板消息管理',
            key: 'mttId',
            children: (_jsx(MessageTypeTemplateIdList, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-mttId-${oakId}` })),
        });
    }
    if (['wechatPublic'].includes(type)) {
        items.push({
            label: '菜单管理',
            key: 'menu',
            children: (_jsx(WechatMenu, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-menu-${oakId}`, tabKey: tabKey }))
        }, {
            label: '被关注回复管理',
            key: 'autoReply',
            children: (_jsx(WechatPublicAutoReply, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detial-autoReply-${oakId}` }))
        }, {
            label: '标签管理',
            key: 'tag',
            children: (_jsx(WechatPublicTag, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-tag-${oakId}` }))
        }, {
            label: '用户管理',
            key: 'user',
            children: (_jsx(UserWechatPublicTag, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-user-${oakId}` }))
        });
    }
    return (_jsx(PageHeader, { showBack: true, title: "\u5E94\u7528\u6982\u89C8", children: _jsx("div", { className: Style.container, children: _jsx(Card, { title: name, bordered: false, extra: Actions, children: _jsx(Tabs, { items: items, onChange: (key) => {
                        setTabKey(key);
                    } }) }) }) }));
}
