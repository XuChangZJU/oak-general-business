"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { relations, rows, rule, onPickRelations, onPickRows, pickedRowIds, pickedRelationIds, entity, disablePickRow, disablePickRelation, pickRelationRule } = props.data;
    const { t } = props.methods;
    if (rows?.length > 0 && relations?.length > 0) {
        const Row = rows.length === 1 ?
            rows[0].value ? ((0, jsx_runtime_1.jsx)(antd_mobile_1.List, { mode: 'card', header: t(`${entity}:name`), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.singleRowValue, children: rows[0].value }) }) })) : (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) // 没value干脆不渲染，渲染id会给用户造成疑惑
            : ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Header, { children: t('pickRow', { entity: t(`${entity}:name`) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.CheckList, { value: pickedRowIds || [], disabled: disablePickRow, onChange: (val) => onPickRows(val), children: rows.map((row) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.CheckList.Item, { value: row.id, children: row.value }))) })] }));
        const Relation = ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.List, { mode: 'card', header: t(`pickRelation.${pickRelationRule}`), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.CheckList, { multiple: rule !== 'single', value: pickedRelationIds || [], disabled: disablePickRelation, onChange: (val) => onPickRelations(val), children: relations.map((relation) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.CheckList.Item, { value: relation.id, children: t(`${entity}:r.${relation.name}`) }))) }) }) }));
        return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [Row, Relation] }));
    }
    return null;
}
exports.default = Render;
