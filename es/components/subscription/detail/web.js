import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Card, Descriptions, Typography } from 'antd';
export default function Render(props) {
    const { oakId, tabValue, config, name, description, entity, entityId } = props.data;
    const { t, navigateBack, onTabClick } = props.methods;
    return (_jsx(Card, { title: name, bordered: false, children: _jsx(Tabs, { items: [
                {
                    label: '订阅号概览',
                    key: 'detail',
                    children: (_jsxs(Descriptions, { column: 1, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('subscription:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('subscription:attr.description'), children: description })] })),
                },
            ] }) }));
}
