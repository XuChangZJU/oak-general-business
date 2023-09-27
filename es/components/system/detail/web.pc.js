import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Descriptions, Typography } from 'antd';
export default function Render(props) {
    const { oakId, folder, name, description, 'super': isSuper } = props.data;
    const { t } = props.methods;
    return (_jsxs(Descriptions, { column: 1, bordered: true, children: [_jsx(Descriptions.Item, { label: "id", children: _jsx(Typography.Paragraph, { copyable: true, children: oakId }) }), _jsx(Descriptions.Item, { label: t('system:attr.name'), children: name }), _jsx(Descriptions.Item, { label: t('system:attr.description'), children: description }), _jsx(Descriptions.Item, { label: t('system:attr.super'), children: isSuper ? '是' : '否' }), _jsx(Descriptions.Item, { label: t('system:attr.folder'), children: folder })] }));
}
