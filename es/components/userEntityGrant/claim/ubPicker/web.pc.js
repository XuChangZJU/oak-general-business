import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography, Radio, Checkbox, List, Divider, Flex, Space } from 'antd';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { relations, rows, rule, onPickRelations, onPickRows, pickedRowIds, pickedRelationIds, entity, disablePickRow, disablePickRelation, pickRelationRule, disabled, } = props.data;
    const { t } = props.methods;
    if (rows?.length > 0 && relations?.length > 0) {
        const Row = rows.length === 1 ? (rows[0].value ? (_jsxs(_Fragment, { children: [_jsx(Divider, { orientation: "left", children: t(`${entity}:name`) }), _jsx(Space, { children: _jsx(Typography.Title, { children: rows[0].value }) })] })) : null) : (_jsxs(_Fragment, { children: [_jsx(Divider, { orientation: "left", children: t('pickRow', { entity: t(`${entity}:name`) }) }), _jsx(Checkbox.Group, { value: pickedRowIds || [], disabled: disablePickRow || disabled, onChange: (val) => onPickRows(val), children: rows.map((row) => (_jsx(Checkbox, { value: row.id, children: row.value }))) })] }));
        const Relation = (_jsxs(_Fragment, { children: [_jsx(Divider, { orientation: "left", children: t(`pickRelation.${pickRelationRule}`) }), _jsx(List, { children: rule !== 'single' ? (_jsx(Checkbox.Group, { value: pickedRelationIds || [], disabled: disablePickRelation || disabled, onChange: (val) => onPickRelations(val), children: relations.map((relation) => (_jsx(Checkbox, { value: relation.id, children: t(`${entity}:r.${relation.name}`) }))) })) : (_jsx(Radio.Group, { onChange: (e) => {
                            const val = e.target.value;
                            onPickRelations([val]);
                        }, value: pickedRelationIds?.[0] || undefined, children: relations.map((relation) => (_jsx(Radio, { value: relation.id, children: t(`${entity}:r.${relation.name}`) }))) })) })] }));
        return (_jsxs(Flex, { vertical: true, className: Styles.container, children: [Row, Relation] }));
    }
    return null;
}
