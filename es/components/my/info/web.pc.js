import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Styles from './web.pc.module.less';
import { Button, List, Modal, Tag, Input, Radio } from 'antd';
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
    return (_jsxs("div", { className: Styles.container, children: [_jsxs("div", { className: Styles.header, children: [_jsx(MyAvatar, { size: 66, iconColor: "white" }), _jsx("div", { className: Styles.name, children: nameText || t('unset') }), showLogout && _jsx(Button, { size: 'small', onClick: () => logout(), children: t('logout') })] }), _jsx("div", { className: Styles.body, children: _jsxs(List, { itemLayout: "vertical", children: [_jsx(List.Item, { extra: _jsx(OakIcon, { name: "pen-to-square" }), onClick: () => setUpdateAttr('nickname'), children: _jsx(List.Item.Meta, { title: t('user:attr.nickname'), description: nickname || t('unset') }) }), _jsx(List.Item, { extra: _jsx(OakIcon, { name: "pen-to-square" }), onClick: () => setUpdateAttr('name'), children: _jsx(List.Item.Meta, { title: t('user:attr.name'), description: name || t('unset') }) }), _jsx(List.Item, { children: _jsx(List.Item.Meta, { title: t('user:attr.userState'), description: _jsx(Tag, { color: UserStateColor[userState], children: t(`user:v.userState.${userState}`) }) }) }), _jsx(List.Item, { children: _jsx(List.Item.Meta, { title: t('user:attr.idState'), description: _jsx(Tag, { color: IdStateColor[idState], children: t(`user:v.idState.${idState}`) }) }) }), _jsx(List.Item, { extra: _jsx(OakIcon, { name: "pen-to-square" }), onClick: () => setUpdateAttr('gender'), children: _jsx(List.Item.Meta, { title: t('user:attr.gender'), description: gender ? t(`user:v.gender.${gender}`) : t('unset') }) }), _jsx("a", { href: '/mobile/me', children: _jsx(List.Item, { extra: _jsx(OakIcon, { name: "chevron-right" }), children: _jsx(List.Item.Meta, { title: t('mobile'), description: mobileText }) }) })] }) }), _jsx("div", { className: Styles.extraContainer, children: _jsx("div", { className: Styles.extra, children: _jsx("a", { href: "/user/manage", children: _jsx(OakIcon, { name: "wand-magic-sparkles", size: 26, color: "warning" }) }) }) }), _jsxs(Modal, { open: !!updateAttr, onOk: async () => {
                    await updateAttribute(updateAttr, updateValue);
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, onCancel: () => {
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, okButtonProps: {
                    disabled: updateValue === undefined,
                }, children: [updateAttr !== 'gender'
                        && _jsx(Input, { maxLength: updateAttr === 'name' ? 16 : 64, value: updateValue || props.data[updateAttr], onChange: ({ target }) => {
                                const { value } = target;
                                setUpdateValue(value);
                            } }), updateAttr === 'gender'
                        && _jsx(Radio.Group, { options: GenderOptions, value: updateValue || gender, onChange: (e) => {
                                const { value } = e.target;
                                setUpdateValue(value);
                            } })] })] }));
}
