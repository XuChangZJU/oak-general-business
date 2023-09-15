"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const antd_mobile_1 = require("antd-mobile");
const avatar_1 = tslib_1.__importDefault(require("../avatar"));
const icon_1 = tslib_1.__importDefault(require("../../icon"));
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
function Render(props) {
    const { nameText, mobileText, userId, nickname, name, idState, userState, gender, showLogout } = props.data;
    const { t, logout, navigateTo, updateAttribute } = props.methods;
    const [updateAttr, setUpdateAttr] = (0, react_1.useState)(undefined);
    const [updateValue, setUpdateValue] = (0, react_1.useState)(undefined);
    if (!userId) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.header, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { onClick: () => navigateTo({
                            url: '/login',
                        }), children: t('login') }) }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.body })] }));
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.header, children: [(0, jsx_runtime_1.jsx)(avatar_1.default, { size: 66, iconColor: "white" }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.name, children: nameText || t('unset') })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.body, children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: nickname || t('unset'), onClick: () => setUpdateAttr('nickname'), children: t('user:attr.nickname') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: name || t('unset'), onClick: () => setUpdateAttr('name'), children: t('user:attr.name') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: UserStateColor[userState], children: t(`user:v.userState.${userState}`) }), children: t('user:attr.userState') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: IdStateColor[idState], children: t(`user:v.idState.${idState}`) }), children: t('user:attr.idState') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: gender ? t(`user:v.gender.${gender}`) : t('unset'), onClick: () => setUpdateAttr('gender'), children: t('user:attr.gender') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: mobileText, onClick: () => navigateTo({ url: '/mobile/me' }), children: t('mobile') })] }) }), showLogout && (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, color: "warning", onClick: () => logout(), children: t('logout') })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.extraMobile, children: (0, jsx_runtime_1.jsx)("a", { href: "/user/manage", children: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "wand-magic-sparkles", size: 26, color: "warning" }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Popup, { position: "bottom", visible: !!updateAttr, onClose: () => {
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, closeOnMaskClick: true, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Form, { layout: "horizontal", children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.Form.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { size: "middle", disabled: !updateValue, color: "primary", onClick: async () => {
                                await updateAttribute(updateAttr, updateValue);
                                setUpdateAttr(undefined);
                                setUpdateValue(undefined);
                            }, children: t('common::action.confirm') }), children: [updateAttr !== 'gender'
                                && (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { className: web_pc_module_less_1.default.input, maxLength: updateAttr === 'name' ? 16 : 64, value: updateValue || props.data[updateAttr], onChange: (value) => {
                                        setUpdateValue(value);
                                    } }), updateAttr === 'gender'
                                && (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, { value: updateValue || gender, onChange: (value) => {
                                        setUpdateValue(value);
                                    }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: "horizontal", children: GenderOptions.map(ele => (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, { value: ele.value, children: ele.label })) }) })] }) }) })] }));
}
exports.default = Render;
