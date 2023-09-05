import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Card, Descriptions, Typography } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import ApplicationList from '../../../pages/application/list';
import DomainList from '../../../pages/domain/list';
import Style from './web.module.less';
export default function Render(props) {
    const { oakId, folder, name, tabValue, description, 'super': isSuper, platform } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (_jsx(PageHeader, { showBack: true, title: "\u7CFB\u7EDF\u4FE1\u606F", children: _jsx("div", { className: Style.container, children: _jsx(Card, { title: name, bordered: false, children: _jsx(Tabs, { activeKey: tabValue, onTabClick: (key) => {
                        onTabClick(key);
                    }, items: [
                        {
                            label: '系统概览',
                            key: 'detail',
                            children: (_jsxs(Descriptions, { column: 1, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('system:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('system:attr.description'), children: description }), _jsx(Descriptions.Item, { label: t('system:attr.super'), children: isSuper ? '是' : '否' }), _jsx(Descriptions.Item, { label: t('system:attr.folder'), children: folder }), _jsx(Descriptions.Item, { label: t('system:attr.platform') +
                                            t('platform:attr.name'), children: platform?.name })] })),
                        },
                        {
                            label: '应用管理',
                            key: 'application_list',
                            children: (_jsx(ApplicationList, { systemId: oakId, variant: "inline", oakPath: "$system/detail-application/list", oakAutoUnmount: true })),
                        },
                        {
                            label: '域名管理',
                            key: 'domain_list',
                            children: (_jsx(DomainList, { systemId: oakId, variant: "inline", oakPath: "$system/detail-domain/list", oakAutoUnmount: true })),
                        },
                    ] }) }) }) }));
}
