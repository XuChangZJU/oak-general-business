"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var userRelation_1 = tslib_1.__importDefault(require("./userRelation"));
function Render(props) {
    var _a = props.data, name = _a.name, isNew = _a.isNew, nickname = _a.nickname, password = _a.password, relations = _a.relations, oakFullpath = _a.oakFullpath, entity = _a.entity, entityId = _a.entityId;
    var _b = props.methods, t = _b.t, update = _b.update;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { style: { marginBottom: 0 }, label: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.tip }, { children: !isNew ? t('existedUser') : t('newUser') })) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.name'), name: "name", rules: [
                    {
                        required: true,
                    },
                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { disabled: !isNew, onChange: function (value) {
                            update({
                                name: value,
                            });
                        }, value: name, placeholder: t('placeholder.name') }) }) })), !isNew ? (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.nickname'), name: "nickname", rules: [
                    {
                        required: true,
                    },
                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { disabled: true, value: nickname }) }) })) : (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.password'), name: "password", rules: [
                    {
                        required: true,
                    },
                ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { value: password, onChange: function (value) {
                            update({
                                password: value,
                            });
                        }, placeholder: t('placeholder.password') }) }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('auth'), rules: [
                    {
                        required: true,
                    },
                ], name: "relation" }, { children: (0, jsx_runtime_1.jsx)(userRelation_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? "".concat(oakFullpath, ".userRelation$user")
                        : undefined, entity: entity, entityId: entityId, relations: relations }) }))] }));
}
exports.default = Render;
