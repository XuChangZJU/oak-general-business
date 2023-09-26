import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Card, Descriptions, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
export default function Render(props) {
    const { oakId, url, tabValue, system, apiPath, protocol, port } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (_jsx(PageHeader, { showBack: true, title: "\u57DF\u540D\u6982\u89C8", children: _jsx("div", { className: Style.container, children: _jsx(Card, { title: url, bordered: false, children: _jsx(Tabs, { activeKey: tabValue, onTabClick: (key) => {
                        onTabClick(key);
                    }, items: [
                        {
                            label: '域名概览',
                            key: 'detail',
                            children: (_jsxs(Descriptions, { column: 1, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('domain:attr.url'), children: url }), _jsx(Descriptions.Item, { label: t('domain:attr.apiPath'), children: apiPath }), _jsx(Descriptions.Item, { label: t('domain:attr.port'), children: port }), _jsx(Descriptions.Item, { label: t('domain:attr.protocol'), children: protocol }), _jsx(Descriptions.Item, { label: t('domain:attr.system') +
                                            t('system:attr.name'), children: system?.name })] })),
                        },
                    ] }) }) }) }));
}
