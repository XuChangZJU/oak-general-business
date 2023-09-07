import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tag, Avatar, Descriptions } from 'antd';
import Style from './web.module.less';
import ActionPanel from '../../../../components/func/actionPanel';
export default function render(props) {
    const { nickname, avatar, name, userState, idState, gender, stateColor, idStateColor, mobileText, executableActions, actionDescriptions, birth, } = props.data;
    const { t, onActionClick } = props.methods;
    return (_jsx("div", { className: Style.container, children: _jsxs(Descriptions, { extra: _jsx(ActionPanel, { actions: executableActions, actionDescriptions: actionDescriptions, onActionClick: (action) => onActionClick(action) }), children: [_jsx(Descriptions.Item, { label: t('avatar'), children: avatar ? _jsx(Avatar, { src: avatar }) : t('unset') }), _jsx(Descriptions.Item, { label: t('user:attr.nickname'), children: nickname || t('unset') }), _jsx(Descriptions.Item, { label: t('user:attr.name'), children: name || t('unset') }), _jsx(Descriptions.Item, { label: t('user:attr.gender'), children: gender ? t(`user:v.gender.${gender}`) : t('unset') }), _jsx(Descriptions.Item, { label: t('user:attr.birth'), children: birth || t('unset') }), _jsx(Descriptions.Item, { label: t('mobile'), children: mobileText || t('unset') }), _jsx(Descriptions.Item, { label: t('user:attr.userState'), children: _jsx(Tag, { color: stateColor[userState], children: t(`user:v.userState.${userState}`) }) }), _jsx(Descriptions.Item, { label: t('user:attr.idState'), children: _jsx(Tag, { color: idStateColor[idState], children: t(`user:v.idState.${idState}`) }) })] }) }));
}
