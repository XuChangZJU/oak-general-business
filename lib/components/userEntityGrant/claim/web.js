"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { userEntityGrant, content: Con, isGrantee, hasClaimed, counterStr, hideInfo, pickedRowIds, pickedRelationIds, oakExecutable } = props.data;
    const { t, onPickRelations, onPickRows } = props.methods;
    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired } = userEntityGrant;
        if (isGrantee) {
            // todo
        }
        return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.NoticeBar, { content: t('tip'), color: 'info' }), !hideInfo && (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.info, children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { mode: 'card', header: t('source'), children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: userEntityGrant.granter.name || userEntityGrant.granter.nickname, children: t('granterName') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: expired ? t('expired') : counterStr, children: expired ? t('isExpired') : t('counter') })] }) }), (0, jsx_runtime_1.jsx)(Con, { entity: relationEntity, entityFilter: relationEntityFilter, rule: rule, ruleOnRow: ruleOnRow, relationIds: relationIds, onPickRows: onPickRows, onPickRelations: onPickRelations, pickedRelationIds: pickedRelationIds, pickedRowIds: pickedRowIds, oakPath: "$uegClaim-content" }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, color: 'primary', disabled: oakExecutable !== true, children: t('userEntityGrant:action.claim') })] }));
    }
    return null;
}
exports.default = Render;
