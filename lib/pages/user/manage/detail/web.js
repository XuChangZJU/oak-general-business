"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var actionPanel_1 = tslib_1.__importDefault(require("../../../../components/func/actionPanel"));
function render(props) {
    var _a = props.data, nickname = _a.nickname, avatar = _a.avatar, name = _a.name, userState = _a.userState, idState = _a.idState, gender = _a.gender, stateColor = _a.stateColor, idStateColor = _a.idStateColor, mobileText = _a.mobileText, executableActions = _a.executableActions, actionDescriptions = _a.actionDescriptions, birth = _a.birth;
    var _b = props.methods, t = _b.t, onActionClick = _b.onActionClick;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { className: mobile_module_less_1.default.list, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: avatar ? (0, jsx_runtime_1.jsx)(antd_mobile_1.Avatar, { src: avatar }) : t('unset'), children: t('avatar') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: nickname || t('unset'), children: t('user:attr.nickname') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: name || t('unset'), children: t('user:attr.name') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: gender ? t("user:v.gender.".concat(gender)) : t('unset'), children: t('user:attr.gender') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: birth || t('unset'), children: t('user:attr.birth') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: mobileText, children: t('mobile') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: stateColor[userState], children: t("user:v.userState.".concat(userState)) }), children: t('user:attr.userState') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)(antd_mobile_1.Tag, { color: idStateColor[idState], children: t("user:v.idState.".concat(idState)) }), children: t('user:attr.idState') })] }), (0, jsx_runtime_1.jsx)(actionPanel_1.default, { actions: executableActions, actionDescriptions: actionDescriptions, onActionClick: function (action) { return onActionClick(action); } })] }));
}
exports.default = render;
