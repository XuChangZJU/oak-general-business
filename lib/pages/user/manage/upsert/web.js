"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_mobile_1 = require("antd-mobile");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;
    const { t, update, setDisablePulldownRefresh, confirm } = methods;
    const [birthPickerVisible, setBirthPickerVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { layout: "horizontal", children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.nickname'), rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { onChange: (val) => update({ nickname: val }), value: data.nickname || '' }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.name'), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { onChange: (val) => update({ name: val }), value: data.name || '' }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.birth'), onClick: () => {
                            setBirthPickerVisible(true);
                            setDisablePulldownRefresh(true);
                        }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { value: data.birth
                                ? (0, dayjs_1.default)(data.birth).format('YYYY-MM-DD')
                                : '', readOnly: true }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.gender'), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, { onChange: (e) => {
                                update({
                                    gender: e,
                                });
                            }, value: data.gender, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: "horizontal", children: GenderOptions.map((ele, idx) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, { value: ele.value, className: mobile_module_less_1.default.radio, children: ele.label }, idx))) }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.idCardType'), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, { onChange: (e) => {
                                update({
                                    idCardType: e,
                                });
                            }, value: data.idCardType, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: "vertical", children: IDCardTypeOptions.map((ele, idx) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, { value: ele.value, className: mobile_module_less_1.default.radio, children: ele.label }, idx))) }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('user:attr.idNumber'), children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { onChange: (val) => update({ idNumber: val }), value: data.idNumber || '' }) })] }), (0, jsx_runtime_1.jsx)(antd_mobile_1.DatePicker, { visible: birthPickerVisible, max: new Date(), min: new Date('1900-01-01'), onConfirm: (value) => {
                    const val = value.valueOf();
                    update({ birth: val });
                }, onClose: () => {
                    setBirthPickerVisible(false);
                    setDisablePulldownRefresh(false);
                } }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, color: "primary", onClick: () => confirm(), children: t('common::action.confirm') })] }));
}
exports.default = Render;
