"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var actionPanel_1 = tslib_1.__importDefault(require("../../../../components/func/actionPanel"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
function render(props) {
    var _a = props.data, nickname = _a.nickname, avatar = _a.avatar, name = _a.name, userState = _a.userState, idState = _a.idState, gender = _a.gender, stateColor = _a.stateColor, idStateColor = _a.idStateColor, mobileText = _a.mobileText, executableActions = _a.executableActions, actionDescriptions = _a.actionDescriptions, birth = _a.birth;
    var _b = props.methods, t = _b.t, onActionClick = _b.onActionClick;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Descriptions, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(actionPanel_1.default, { actions: executableActions, actionDescriptions: actionDescriptions, onActionClick: function (action) {
                        return onActionClick(action);
                    } }) }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('avatar') }, { children: avatar ? (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: avatar }) : t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('user:attr.nickname') }, { children: nickname || t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('user:attr.name') }, { children: name || t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('user:attr.gender') }, { children: gender ? t("user:v.gender.".concat(gender)) : t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('user:attr.birth') }, { children: birth || t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('mobile') }, { children: mobileText || t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('user:attr.userState') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: stateColor[userState] }, { children: t("user:v.userState.".concat(userState)) })) })), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, tslib_1.__assign({ label: t('user:attr.idState') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: idStateColor[idState] }, { children: t("user:v.idState.".concat(idState)) })) }))] })) })) }));
}
exports.default = render;
