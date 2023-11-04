import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NoticeBar, List, Button } from 'antd-mobile';
import Styles from './web.module.less';
export default function Render(props) {
    const { userEntityGrant, content: Con, isGrantee, hasClaimed, counterStr, hideInfo, pickedRowIds, pickedRelationIds, oakExecutable } = props.data;
    const { t, onPickRelations, onPickRows } = props.methods;
    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired } = userEntityGrant;
        if (isGrantee) {
            // todo
        }
        return (_jsxs("div", { className: Styles.container, children: [_jsx(NoticeBar, { content: t('tip'), color: 'info' }), !hideInfo && _jsx("div", { className: Styles.info, children: _jsxs(List, { mode: 'card', header: t('source'), children: [_jsx(List.Item, { extra: userEntityGrant.granter.name || userEntityGrant.granter.nickname, children: t('granterName') }), _jsx(List.Item, { extra: expired ? t('expired') : counterStr, children: expired ? t('isExpired') : t('counter') })] }) }), _jsx(Con, { entity: relationEntity, entityFilter: relationEntityFilter, rule: rule, ruleOnRow: ruleOnRow, relationIds: relationIds, onPickRows: onPickRows, onPickRelations: onPickRelations, pickedRelationIds: pickedRelationIds, pickedRowIds: pickedRowIds, oakPath: "$uegClaim-content" }), _jsx("div", { style: { flex: 1 } }), _jsx(Button, { block: true, color: 'primary', disabled: oakExecutable !== true, children: t('userEntityGrant:action.claim') })] }));
    }
    return null;
}
