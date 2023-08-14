"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var userRelation_1 = tslib_1.__importDefault(require("./userRelation"));
var string_1 = require("oak-domain/lib/utils/string");
var icons_1 = require("@ant-design/icons");
function Render(props) {
    var _a = props.data, name = _a.name, isNew = _a.isNew, nickname = _a.nickname, password = _a.password, relations = _a.relations, oakFullpath = _a.oakFullpath, entity = _a.entity, entityId = _a.entityId;
    var _b = props.methods, t = _b.t, update = _b.update;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { style: { marginBottom: 0 }, label: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.tip }, { children: !isNew ? t('existedUser') : t('newUser') })), colon: false }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.name'), name: "name", rules: [
                        {
                            required: true,
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: !isNew, onChange: function (e) {
                                var strValue = e.target.value;
                                update({
                                    name: strValue,
                                });
                            }, value: name, placeholder: t('placeholder.name') }) }) })), !isNew ? (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.nickname'), name: "nickname", rules: [
                        {
                            required: true,
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { disabled: true, value: nickname }) }) })) :
                    (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.password'), name: "password", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password, onChange: function (e) {
                                        var strValue = e.target.value;
                                        update({
                                            password: strValue,
                                        });
                                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: t('placeholder.password') }) }) })) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('auth'), rules: [
                        {
                            required: true,
                        },
                    ], name: "relation" }, { children: (0, jsx_runtime_1.jsx)(userRelation_1.default, { oakAutoUnmount: true, oakPath: oakFullpath ? "".concat(oakFullpath, ".user").concat((0, string_1.firstLetterUpperCase)(entity), "$user")
                            : undefined, entity: entity, entityId: entityId, relations: relations }) }))] })) })));
}
exports.default = Render;
