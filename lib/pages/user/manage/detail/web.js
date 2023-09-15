"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
const actionPanel_1 = tslib_1.__importDefault(require("../../../../components/func/actionPanel"));
function render(props) {
    const { nickname, avatar, name, userState, idState, gender, stateColor, idStateColor, mobileText, executableActions, actionDescriptions, birth, } = props.data;
    const { t, onActionClick } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { className: mobile_module_less_1.default.list, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: avatar ? (0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { src: avatar }) : t('unset'), children: t('avatar') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: nickname || t('unset'), children: t('user:attr.nickname') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: name || t('unset'), children: t('user:attr.name') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: gender ? t(`user:v.gender.${gender}`) : t('unset'), children: t('user:attr.gender') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: birth || t('unset'), children: t('user:attr.birth') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: mobileText, children: t('mobile') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: stateColor[userState], children: t(`user:v.userState.${userState}`) }), children: t('user:attr.userState') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: idStateColor[idState], children: t(`user:v.idState.${idState}`) }), children: t('user:attr.idState') })] }), (0, jsx_runtime_1.jsx)(actionPanel_1.default, { actions: executableActions, actionDescriptions: actionDescriptions, onActionClick: (action) => onActionClick(action) })] }));
}
exports.default = render;
