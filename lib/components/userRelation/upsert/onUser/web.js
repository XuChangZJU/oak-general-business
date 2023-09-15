"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
const userRelation_1 = tslib_1.__importDefault(require("./userRelation"));
function Render(props) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId } = props.data;
    const { t, update } = props.methods;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { style: { marginBottom: 0 }, label: (0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default.tip, children: !isNew ? t('existedUser') : t('newUser') }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.name'), name: "name", rules: [
                    {
                        required: true,
                    },
                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { disabled: !isNew, onChange: (value) => {
                            update({
                                name: value,
                            });
                        }, value: name, placeholder: t('placeholder.name') }) }) }), !isNew ? (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.nickname'), name: "nickname", rules: [
                    {
                        required: true,
                    },
                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { disabled: true, value: nickname }) }) }) : (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.password'), name: "password", rules: [
                    {
                        required: true,
                    },
                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { value: password, onChange: (value) => {
                            update({
                                password: value,
                            });
                        }, placeholder: t('placeholder.password') }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('auth'), rules: [
                    {
                        required: true,
                    },
                ], name: "relation", children: (0, jsx_runtime_1.jsx)(userRelation_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? `${oakFullpath}.userRelation$user`
                        : undefined, entity: entity, entityId: entityId, relations: relations }) })] }));
}
exports.default = Render;
