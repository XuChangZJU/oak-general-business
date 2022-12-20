"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
var antd_1 = require("antd");
var avatar_1 = tslib_1.__importDefault(require("../avatar"));
var icon_1 = tslib_1.__importDefault(require("../../icon"));
var PrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-primary');
var WarningColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-warning');
var ErrorColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-error');
var SuccessColor = getComputedStyle(document.documentElement).getPropertyValue('--oak-color-success');
var UserStateColor = {
    normal: PrimaryColor,
    merged: WarningColor,
    shadow: WarningColor,
    disabled: ErrorColor,
};
var IdStateColor = {
    unverified: WarningColor,
    verifying: PrimaryColor,
    verified: SuccessColor,
};
function Render(props) {
    var _this = this;
    var _a = props.data, nameText = _a.nameText, mobileText = _a.mobileText, userId = _a.userId, nickname = _a.nickname, name = _a.name, idState = _a.idState, userState = _a.userState, gender = _a.gender;
    var _b = props.methods, t = _b.t, logout = _b.logout, navigateTo = _b.navigateTo, updateAttribute = _b.updateAttribute;
    var _c = tslib_1.__read((0, react_1.useState)(undefined), 2), updateAttr = _c[0], setUpdateAttr = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(undefined), 2), updateValue = _d[0], setUpdateValue = _d[1];
    if (!userId) {
        return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.header }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () { return navigateTo({
                            url: '/login',
                        }); } }, { children: t('login') })) })), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.body })] })));
    }
    var GenderOptions = [
        {
            label: t('user:v.gender.male'),
            value: 'male',
        },
        {
            label: t('user:v.gender.female'),
            value: 'female',
        }
    ];
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.header }, { children: [(0, jsx_runtime_1.jsx)(avatar_1.default, { size: 66, iconColor: "white" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.name }, { children: nameText || t('unset') })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: 'small', onClick: function () { return logout(); } }, { children: t('logout') }))] })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.body }, { children: (0, jsx_runtime_1.jsxs)(antd_1.List, tslib_1.__assign({ itemLayout: "vertical" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "pen-to-square" }), onClick: function () { return setUpdateAttr('nickname'); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.nickname'), description: nickname || t('unset') }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "pen-to-square" }), onClick: function () { return setUpdateAttr('name'); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.name'), description: name || t('unset') }) })), (0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.userState'), description: (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: UserStateColor[userState] }, { children: t("user:v.userState.".concat(userState)) })) }) }), (0, jsx_runtime_1.jsx)(antd_1.List.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.idState'), description: (0, jsx_runtime_1.jsx)(antd_1.Tag, tslib_1.__assign({ color: IdStateColor[idState] }, { children: t("user:v.idState.".concat(idState)) })) }) }), (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "pen-to-square" }), onClick: function () { return setUpdateAttr('gender'); } }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('user:attr.gender'), description: gender ? t("user:v.gender.".concat(gender)) : t('unset') }) })), (0, jsx_runtime_1.jsx)("a", tslib_1.__assign({ href: '/mobile/me' }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "chevron-right" }) }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { title: t('mobile'), description: mobileText }) })) }))] })) })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.extraContainer }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_pc_module_less_1.default.extra }, { children: (0, jsx_runtime_1.jsx)("a", tslib_1.__assign({ href: "/user/manage" }, { children: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "wand-magic-sparkles", size: 26, color: "warning" }) })) })) })), (0, jsx_runtime_1.jsxs)(antd_1.Modal, tslib_1.__assign({ open: !!updateAttr, onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, updateAttribute(updateAttr, updateValue)];
                            case 1:
                                _a.sent();
                                setUpdateAttr(undefined);
                                setUpdateValue(undefined);
                                return [2 /*return*/];
                        }
                    });
                }); }, onCancel: function () {
                    setUpdateAttr(undefined);
                    setUpdateValue(undefined);
                }, okButtonProps: {
                    disabled: updateValue === undefined,
                } }, { children: [updateAttr !== 'gender'
                        && (0, jsx_runtime_1.jsx)(antd_1.Input, { maxLength: updateAttr === 'name' ? 16 : 64, value: updateValue || props.data[updateAttr], onChange: function (_a) {
                                var target = _a.target;
                                var value = target.value;
                                setUpdateValue(value);
                            } }), updateAttr === 'gender'
                        && (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { options: GenderOptions, value: updateValue || gender, onChange: function (e) {
                                var value = e.target.value;
                                setUpdateValue(value);
                            } })] }))] })));
}
exports.default = Render;
