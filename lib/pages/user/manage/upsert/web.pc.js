"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var GenderOptions = data.GenderOptions, IDCardTypeOptions = data.IDCardTypeOptions;
    var t = methods.t, update = methods.update, confirm = methods.confirm;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ layout: "horizontal", labelCol: { span: 8 }, wrapperCol: { span: 16 }, style: { maxWidth: 600 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.nickname') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) { return update({ nickname: e.target.value }); }, value: data.nickname || '' }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.name') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) { return update({ name: e.target.value }); }, value: data.name || '' }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.birth') }, { children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, { value: data.birth ? (0, dayjs_1.default)(data.birth) : undefined, format: 'YYYY/MM/DD', onChange: function (value) {
                            return update({ birth: (0, dayjs_1.default)(value).valueOf() });
                        } }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.gender') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, tslib_1.__assign({ onChange: function (e) {
                            update({
                                gender: e.target
                                    .value,
                            });
                        }, value: data.gender }, { children: GenderOptions.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(antd_1.Radio, tslib_1.__assign({ value: ele.value }, { children: ele.label }), idx)); }) })) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.idCardType') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, tslib_1.__assign({ onChange: function (e) {
                            update({
                                idCardType: e.target
                                    .value,
                            });
                        }, value: data.idCardType }, { children: IDCardTypeOptions.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(antd_1.Radio, tslib_1.__assign({ value: ele.value, className: web_module_less_1.default.radio }, { children: ele.label }), idx)); }) })) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.idNumber') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) { return update({ idNumber: e.target.value }); }, value: data.idNumber || '' }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 8, span: 16 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", color: "primary", onClick: function () { return confirm(); } }, { children: t('common::action.confirm') })) }))] })) })));
}
exports.default = Render;
