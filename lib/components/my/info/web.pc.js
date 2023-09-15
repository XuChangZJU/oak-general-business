"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const antd_1 = require("antd");
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
        return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.header, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => navigateTo({
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.header, children: [(0, jsx_runtime_1.jsx)(avatar_1.default, { size: 66, iconColor: "white" }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.name, children: nameText || t('unset') }), showLogout && (0, jsx_runtime_1.jsx)(antd_1.Button, { size: 'small', onClick: () => logout(), children: t('logout') })] }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.body, children: (0, jsx_runtime_1.jsxs)(antd_1.List, { itemLayout: "vertical", children: [(0, jsx_runtime_1.jsx)(antd_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "pen-to-square" }), onClick: () => setUpdateAttr('nickname'), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.nickname'), description: nickname || t('unset') }) }), (0, jsx_runtime_1.jsx)(antd_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "pen-to-square" }), onClick: () => setUpdateAttr('name'), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.name'), description: name || t('unset') }) }), (0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.userState'), description: (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: UserStateColor[userState], children: t(`user:v.userState.${userState}`) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.idState'), description: (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: IdStateColor[idState], children: t(`user:v.idState.${idState}`) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "pen-to-square" }), onClick: () => setUpdateAttr('gender'), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.gender'), description: gender ? t(`user:v.gender.${gender}`) : t('unset') }) }), (0, jsx_runtime_1.jsx)("a", { href: '/mobile/me', children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "chevron-right" }), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('mobile'), description: mobileText }) }) })] }) }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.extraContainer, children: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.extra, children: (0, jsx_runtime_1.jsx)("a", { href: "/user/manage", children: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "wand-magic-sparkles", size: 26, color: "warning" }) }) }) }), (0, jsx_runtime_1.jsxs)(antd_1.Modal, { open: !!updateAttr, onOk: async () => {
                    await updateAttribute(updateAttr, updateValue);
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, onCancel: () => {
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, okButtonProps: {
                    disabled: updateValue === undefined,
                }, children: [updateAttr !== 'gender'
                        && (0, jsx_runtime_1.jsx)(antd_1.Input, { maxLength: updateAttr === 'name' ? 16 : 64, value: updateValue || props.data[updateAttr], onChange: ({ target }) => {
                                const { value } = target;
                                setUpdateValue(value);
                            } }), updateAttr === 'gender'
                        && (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { options: GenderOptions, value: updateValue || gender, onChange: (e) => {
                                const { value } = e.target;
                                setUpdateValue(value);
                            } })] })] }));
}
exports.default = Render;
