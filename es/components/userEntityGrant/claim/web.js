import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NoticeBar, List, Button } from 'antd-mobile';
import UbPicker from './ubPicker';
import Styles from './web.module.less';
export default function Render(props) {
    const { userEntityGrant, picker: Picker, isGranter, hasClaimed, counterStr, hideInfo, pickedRowIds, pickedRelationIds, oakExecutable, hideTip } = props.data;
    const { t, onPickRelations, onPickRows, claim } = props.methods;
    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired } = userEntityGrant;
        const Picker2 = Picker || UbPicker;
        return (_jsxs("div", { className: Styles.container, children: [(!hideTip && !isGranter && !hasClaimed) && _jsx(NoticeBar, { content: t('tip'), color: 'info' }), isGranter && _jsx(NoticeBar, { content: t('isGranter'), color: 'error' }), hasClaimed && _jsx(NoticeBar, { content: t('hasClaimed'), color: 'error' }), !hideInfo && _jsx("div", { className: Styles.info, children: _jsxs(List, { mode: 'card', header: t('source'), children: [_jsx(List.Item, { extra: userEntityGrant.granter.name || userEntityGrant.granter.nickname, children: t('granterName') }), _jsx(List.Item, { extra: expired ? t('expired') : counterStr, children: expired ? t('isExpired') : t('counter') })] }) }), _jsx(Picker2, { disabled: !!expired || hasClaimed || isGranter, entity: relationEntity, entityFilter: relationEntityFilter, rule: rule, ruleOnRow: ruleOnRow, relationIds: relationIds, onPickRows: onPickRows, onPickRelations: onPickRelations, pickedRelationIds: pickedRelationIds, pickedRowIds: pickedRowIds, oakPath: "$uegClaim-content" }), _jsx("div", { style: { flex: 1 } }), _jsx(Button, { block: true, color: isGranter || hasClaimed ? 'danger' : (!expired ? 'primary' : 'warning'), disabled: oakExecutable !== true || !!expired || isGranter || hasClaimed, onClick: () => claim(), children: isGranter ? t('isGranter') : (hasClaimed ? t('hasClaimed') : (!expired ? t('userEntityGrant:action.claim') : t('expired'))) })] }));
    }
    return null;
}
