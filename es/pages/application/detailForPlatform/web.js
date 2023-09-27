import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs, Card } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
import WechatMenu from '../../../components/wechatMenu';
import WechatPublicAutoReply from '../../../components/wechatPublicAutoReply';
export default function Render(props) {
    const { oakId, tabValue, config, name, description, type, system } = props.data;
    const { t, navigateBack, onTabClick, goWechatPublicTagList } = props.methods;
    const Actions = [];
    const items = [
        {
            label: '公众号菜单管理',
            key: 'menu',
            children: (_jsx(WechatMenu, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detail-menu-${oakId}`, isPlatform: true }))
        },
        {
            label: '被关注回复管理',
            key: 'autoReply',
            children: (_jsx(WechatPublicAutoReply, { oakAutoUnmount: true, applicationId: oakId, oakPath: `$application-detial-autoReply-${oakId}` }))
        }
    ];
    return (_jsx(PageHeader, { showBack: true, title: "\u5E94\u7528\u6982\u89C8", children: _jsx("div", { className: Style.container, children: _jsx(Card, { title: name, bordered: false, extra: Actions, children: _jsx(Tabs, { items: items }) }) }) }));
}
