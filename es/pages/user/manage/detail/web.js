import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Tag, Avatar } from 'antd-mobile';
import Style from './mobile.module.less';
import ActionPanel from '../../../../components/func/actionPanel';
export default function render(props) {
    const { nickname, avatar, name, userState, idState, gender, stateColor, idStateColor, mobileText, executableActions, actionDescriptions, birth, } = props.data;
    const { t, onActionClick } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [_jsxs(List, { className: Style.list, children: [_jsx(List.Item, { extra: avatar ? _jsx(Avatar, { src: avatar }) : t('unset'), children: t('avatar') }), _jsx(List.Item, { extra: nickname || t('unset'), children: t('user:attr.nickname') }), _jsx(List.Item, { extra: name || t('unset'), children: t('user:attr.name') }), _jsx(List.Item, { extra: gender ? t(`user:v.gender.${gender}`) : t('unset'), children: t('user:attr.gender') }), _jsx(List.Item, { extra: birth || t('unset'), children: t('user:attr.birth') }), _jsx(List.Item, { extra: mobileText, children: t('mobile') }), _jsx(List.Item, { extra: _jsx(Tag, { color: stateColor[userState], children: t(`user:v.userState.${userState}`) }), children: t('user:attr.userState') }), _jsx(List.Item, { extra: _jsx(Tag, { color: idStateColor[idState], children: t(`user:v.idState.${idState}`) }), children: t('user:attr.idState') })] }), _jsx(ActionPanel, { actions: executableActions, actionDescriptions: actionDescriptions, onActionClick: (action) => onActionClick(action) })] }));
}
