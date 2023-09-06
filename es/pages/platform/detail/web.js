import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Card, Descriptions, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import SystemList from '../../system/list';
import Style from './web.module.less';
export default function Render(props) {
    const { oakId, config, name, tabValue, description } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (_jsx(PageHeader, { showBack: true, title: "\u5E73\u53F0\u6982\u89C8", children: _jsx("div", { className: Style.container, children: _jsx(Card, { title: name, bordered: false, children: _jsx(Tabs, { activeKey: tabValue, onTabClick: (key) => {
                        onTabClick(key);
                    }, items: [
                        {
                            label: '平台信息',
                            key: 'detail',
                            children: (_jsxs(Descriptions, { column: 1, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('platform:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('platform:attr.description'), children: description })] })),
                        },
                        {
                            label: '系统管理',
                            key: 'system_list',
                            children: (_jsx(SystemList, { platformId: oakId, variant: "inline", oakPath: "$platform/detail/-system/list", oakAutoUnmount: true })),
                        },
                    ] }) }) }) }));
}
