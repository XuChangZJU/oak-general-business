import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import WechatMenu from './menu';
import ConditionalMenu from './conditionalMenu';
import Style from './web.module.less';
import { Tabs } from 'antd';
import TagList from './tagList';
export default function Render(props) {
    const { menuId, oakFullpath, is_menu_open, applicationId, isPlatform } = props.data;
    const {} = props.methods;
    const [menuType, setMenuType] = useState('common');
    const [tag, setTag] = useState({});
    const getTag = (tag) => {
        setTag(tag);
    };
    const items = [
        {
            key: '1',
            label: '通用菜单',
            children: _jsx(WechatMenu, { menuId: menuId ? menuId : undefined, oakPath: '$wechatMenu', applicationId: applicationId, oakAutoUnmount: true, menuType: menuType }),
        },
        {
            key: '2',
            label: '个性化菜单',
            children: _jsxs("div", { className: Style.conditionalMenu, children: [_jsx("div", { className: Style.tagList, children: _jsx(TagList, { oakAutoUnmount: true, oakPath: '$wechatPublicTag', applicationId: applicationId, getTag: getTag }) }), tag.id ? (_jsx(ConditionalMenu, { oakPath: `$conditionalMenu-${tag.id}`, applicationId: applicationId, oakAutoUnmount: true, tagId: tag.id, wechatId: tag.wechatId, menuType: menuType })) : (_jsx("div", { className: Style.tagHelp, children: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u6807\u7B7E" }))] }),
        },
    ];
    if (oakFullpath) {
        return (_jsx("div", { children: is_menu_open ? (_jsx("div", { className: Style.tabs, children: isPlatform ? _jsx(WechatMenu, { menuId: menuId ? menuId : undefined, oakPath: '$wechatMenu', applicationId: applicationId, oakAutoUnmount: true, menuType: menuType }) : _jsx(Tabs, { defaultActiveKey: '1', items: items, onChange: (key) => {
                        if (key === '1') {
                            setMenuType('common');
                        }
                        else {
                            setMenuType('conditional');
                        }
                    } }) })) : (_jsx("div", { className: Style.container, children: _jsx("div", { className: Style.warn, children: "\u5C1A\u672A\u5F00\u542F\u83DC\u5355\uFF0C\u8BF7\u5148\u524D\u5F80\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\u5F00\u542F\u3002" }) })) }));
    }
    return null;
}
