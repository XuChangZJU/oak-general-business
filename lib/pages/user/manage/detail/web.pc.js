"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const actionPanel_1 = tslib_1.__importDefault(require("../../../../components/func/actionPanel"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
function render(props) {
    const { nickname, avatar, name, userState, idState, gender, stateColor, idStateColor, mobileText, executableActions, actionDescriptions, birth, } = props.data;
    const { t, onActionClick } = props.methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { extra: (0, jsx_runtime_1.jsx)(actionPanel_1.default, { actions: executableActions, actionDescriptions: actionDescriptions, onActionClick: (action) => onActionClick(action) }), children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('avatar'), children: avatar ? (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: avatar }) : t('unset') }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('user:attr.nickname'), children: nickname || t('unset') }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('user:attr.name'), children: name || t('unset') }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('user:attr.gender'), children: gender ? t(`user:v.gender.${gender}`) : t('unset') }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('user:attr.birth'), children: birth || t('unset') }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('mobile'), children: mobileText || t('unset') }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('user:attr.userState'), children: (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: stateColor[userState], children: t(`user:v.userState.${userState}`) }) }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: t('user:attr.idState'), children: (0, jsx_runtime_1.jsx)(antd_1.Tag, { color: idStateColor[idState], children: t(`user:v.idState.${idState}`) }) })] }) }) }));
}
exports.default = render;
