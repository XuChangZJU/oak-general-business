import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Styles from './web.pc.module.less';
import { Button, List, Popup, Tag, Input, Radio, Form, Space } from 'antd-mobile';
import MyAvatar from '../avatar';
import OakIcon from 'oak-frontend-base/es/components/icon';
const PrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-primary');
const WarningColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-warning');
const ErrorColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-error');
const SuccessColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-success');
const UserStateColor = {
    normal: PrimaryColor,
    merged: WarningColor,
    shadow: WarningColor,
    disabled: ErrorColor,
};
const IdStateColor = {
    unverified: WarningColor,
    verifying: PrimaryColor,
    verified: SuccessColor,
};
export default function Render(props) {
    const { nameText, mobileText, userId, nickname, name, idState, userState, gender, showLogout } = props.data;
    const { t, logout, navigateTo, updateAttribute } = props.methods;
    const [updateAttr, setUpdateAttr] = useState(undefined);
    const [updateValue, setUpdateValue] = useState(undefined);
    if (!userId) {
        return (_jsxs("div", { className: Styles.container, children: [_jsx("div", { className: Styles.header, children: _jsx(Button, { onClick: () => navigateTo({
                            url: '/login',
                        }), children: t('login') }) }), _jsx("div", { className: Styles.body })] }));
    }
    const GenderOptions = [
        {
            label: t('user:v.gender.male'),
            value: 'male',
        },
        {
            label: t('user:v.gender.female'),
            value: 'female',
        }
    ];
    return (_jsxs("div", { className: Styles.container, children: [_jsxs("div", { className: Styles.header, children: [_jsx(MyAvatar, { size: 66, iconColor: "white" }), _jsx("div", { className: Styles.name, children: nameText || t('unset') })] }), _jsx("div", { className: Styles.body, children: _jsxs(List, { children: [_jsx(List.Item, { extra: nickname || t('unset'), onClick: () => setUpdateAttr('nickname'), children: t('user:attr.nickname') }), _jsx(List.Item, { extra: name || t('unset'), onClick: () => setUpdateAttr('name'), children: t('user:attr.name') }), _jsx(List.Item, { extra: _jsx(Tag, { color: UserStateColor[userState], children: t(`user:v.userState.${userState}`) }), children: t('user:attr.userState') }), _jsx(List.Item, { extra: _jsx(Tag, { color: IdStateColor[idState], children: t(`user:v.idState.${idState}`) }), children: t('user:attr.idState') }), _jsx(List.Item, { extra: gender ? t(`user:v.gender.${gender}`) : t('unset'), onClick: () => setUpdateAttr('gender'), children: t('user:attr.gender') }), _jsx(List.Item, { extra: mobileText, onClick: () => navigateTo({ url: '/mobile/me' }), children: t('mobile') })] }) }), showLogout && _jsxs(_Fragment, { children: [_jsx("div", { style: { flex: 1 } }), _jsx(Button, { block: true, color: "warning", onClick: () => logout(), children: t('logout') })] }), _jsx("div", { className: Styles.extraMobile, children: _jsx("a", { href: "/user/manage", children: _jsx(OakIcon, { name: "wand-magic-sparkles", size: 26, color: "warning" }) }) }), _jsx(Popup, { position: "bottom", visible: !!updateAttr, onClose: () => {
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, closeOnMaskClick: true, children: _jsx(Form, { layout: "horizontal", children: _jsxs(Form.Item, { extra: _jsx(Button, { size: "middle", disabled: !updateValue, color: "primary", onClick: async () => {
                                await updateAttribute(updateAttr, updateValue);
                                setUpdateAttr(undefined);
                                setUpdateValue(undefined);
                            }, children: t('common::action.confirm') }), children: [updateAttr !== 'gender'
                                && _jsx(Input, { className: Styles.input, maxLength: updateAttr === 'name' ? 16 : 64, value: updateValue || props.data[updateAttr], onChange: (value) => {
                                        setUpdateValue(value);
                                    } }), updateAttr === 'gender'
                                && _jsx(Radio.Group, { value: updateValue || gender, onChange: (value) => {
                                        setUpdateValue(value);
                                    }, children: _jsx(Space, { direction: "horizontal", children: GenderOptions.map(ele => _jsx(Radio, { value: ele.value, children: ele.label })) }) })] }) }) })] }));
}
