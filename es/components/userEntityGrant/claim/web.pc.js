import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Space, List, Button, Row, Col, Divider, Flex } from 'antd';
import UbPicker from './ubPicker';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { userEntityGrant, picker: Picker, isGranter, hasClaimed, counterStr, hideInfo, pickedRowIds, pickedRelationIds, oakExecutable, hideTip, } = props.data;
    const { t, onPickRelations, onPickRows, claim } = props.methods;
    if (userEntityGrant) {
        const { relationEntity, relationEntityFilter, rule, ruleOnRow, relationIds, expired, } = userEntityGrant;
        const Picker2 = Picker || UbPicker;
        return (_jsxs(Row, { children: [_jsx(Col, { span: 2 }), _jsx(Col, { span: 20, children: _jsxs(Flex, { vertical: true, className: Styles.container, children: [!hideTip && !isGranter && !hasClaimed && (_jsx(Alert, { message: t('tip'), type: "info", showIcon: true })), isGranter && (_jsx(Alert, { message: t('isGranter'), type: "error", showIcon: true })), hasClaimed && (_jsx(Alert, { message: t('hasClaimed'), type: "error", showIcon: true })), !hideInfo && (_jsxs("div", { className: Styles.info, children: [_jsx(Divider, { orientation: "left", children: t('source') }), _jsxs(List, { itemLayout: "horizontal", children: [_jsxs(List.Item, { children: [_jsx(List.Item.Meta, { title: t('granterName') }), userEntityGrant.granter.name ||
                                                        userEntityGrant.granter.nickname] }), _jsxs(List.Item, { children: [_jsx(List.Item.Meta, { title: expired
                                                            ? t('isExpired')
                                                            : t('counter') }), expired ? t('expired') : counterStr] })] })] })), _jsx(Picker2, { disabled: !!expired || hasClaimed || isGranter, entity: relationEntity, entityFilter: relationEntityFilter, rule: rule, ruleOnRow: ruleOnRow, relationIds: relationIds, onPickRows: onPickRows, onPickRelations: onPickRelations, pickedRelationIds: pickedRelationIds, pickedRowIds: pickedRowIds, oakPath: "$uegClaim-content" }), _jsx(Space, { style: { justifyContent: 'center' }, children: _jsx(Button, { color: isGranter || hasClaimed
                                        ? 'danger'
                                        : !expired
                                            ? 'primary'
                                            : 'warning', disabled: oakExecutable !== true ||
                                        !!expired ||
                                        isGranter ||
                                        hasClaimed, onClick: () => claim(), children: isGranter
                                        ? t('isGranter')
                                        : hasClaimed
                                            ? t('hasClaimed')
                                            : !expired
                                                ? t('userEntityGrant:action.claim')
                                                : t('expired') }) })] }) }), _jsx(Col, { span: 2 })] }));
    }
    return null;
}
