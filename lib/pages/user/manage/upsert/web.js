"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_mobile_1 = require("antd-mobile");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var GenderOptions = data.GenderOptions, IDCardTypeOptions = data.IDCardTypeOptions;
    var t = methods.t, update = methods.update, setDisablePulldownRefresh = methods.setDisablePulldownRefresh, confirm = methods.confirm;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), birthPickerVisible = _a[0], setBirthPickerVisible = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, tslib_1.__assign({ layout: "horizontal" }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.nickname'), rules: [{ required: true }] }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { onChange: function (val) { return update({ nickname: val }); }, value: data.nickname || '' }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.name') }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { onChange: function (val) { return update({ name: val }); }, value: data.name || '' }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.birth'), onClick: function () {
                            setBirthPickerVisible(true);
                            setDisablePulldownRefresh(true);
                        } }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { value: data.birth
                                ? (0, dayjs_1.default)(data.birth).format('YYYY-MM-DD')
                                : '', readOnly: true }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.gender') }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, tslib_1.__assign({ onChange: function (e) {
                                update({
                                    gender: e,
                                });
                            }, value: data.gender }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, tslib_1.__assign({ direction: "horizontal" }, { children: GenderOptions.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, tslib_1.__assign({ value: ele.value, className: mobile_module_less_1.default.radio }, { children: ele.label }), idx)); }) })) })) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.idCardType') }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, tslib_1.__assign({ onChange: function (e) {
                                update({
                                    idCardType: e,
                                });
                            }, value: data.idCardType }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: IDCardTypeOptions.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, tslib_1.__assign({ value: ele.value, className: mobile_module_less_1.default.radio }, { children: ele.label }), idx)); }) })) })) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, tslib_1.__assign({ label: t('user:attr.idNumber') }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { onChange: function (val) { return update({ idNumber: val }); }, value: data.idNumber || '' }) }))] })), (0, jsx_runtime_1.jsx)(antd_mobile_1.DatePicker, { visible: birthPickerVisible, max: new Date(), min: new Date('1900-01-01'), onConfirm: function (value) {
                    var val = value.valueOf();
                    update({ birth: val });
                }, onClose: function () {
                    setBirthPickerVisible(false);
                    setDisablePulldownRefresh(false);
                } }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ block: true, color: "primary", onClick: function () { return confirm(); } }, { children: t('common::action.confirm') }))] })));
}
exports.default = Render;
