import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, CheckList, List } from 'antd-mobile';
import Styles from './web.module.less';
export default function Render(props) {
    const { relations, rows, rule, onPickRelations, onPickRows, pickedRowIds, pickedRelationIds, entity, disablePickRow, disablePickRelation, pickRelationRule } = props.data;
    const { t } = props.methods;
    if (rows?.length > 0 && relations?.length > 0) {
        const Row = rows.length === 1 ?
            rows[0].value ? (_jsx(List, { mode: 'card', header: t(`${entity}:name`), children: _jsx(List.Item, { children: _jsx("div", { className: Styles.singleRowValue, children: rows[0].value }) }) })) : _jsx(_Fragment, {}) // 没value干脆不渲染，渲染id会给用户造成疑惑
            : (_jsxs("div", { children: [_jsx(Form.Header, { children: t('pickRow', { entity: t(`${entity}:name`) }) }), _jsx(CheckList, { value: pickedRowIds || [], disabled: disablePickRow, onChange: (val) => onPickRows(val), children: rows.map((row) => (_jsx(CheckList.Item, { value: row.id, children: row.value }))) })] }));
        const Relation = (_jsx("div", { children: _jsx(List, { mode: 'card', header: t(`pickRelation.${pickRelationRule}`), children: _jsx(CheckList, { multiple: rule !== 'single', value: pickedRelationIds || [], disabled: disablePickRelation, onChange: (val) => onPickRelations(val), children: relations.map((relation) => (_jsx(CheckList.Item, { value: relation.id, children: t(`${entity}:r.${relation.name}`) }))) }) }) }));
        return (_jsxs("div", { className: Styles.container, children: [Row, Relation] }));
    }
    return null;
}
