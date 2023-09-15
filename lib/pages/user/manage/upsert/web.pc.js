"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;
    const { t, update, confirm } = methods;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { layout: "horizontal", labelCol: { span: 8 }, wrapperCol: { span: 16 }, style: { maxWidth: 600 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.nickname'), required: true, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => update({ nickname: e.target.value }), value: data.nickname || '' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.name'), children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => update({ name: e.target.value }), value: data.name || '' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.birth'), children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, { value: data.birth ? (0, dayjs_1.default)(data.birth) : undefined, format: 'YYYY/MM/DD', onChange: (value) => update({ birth: (0, dayjs_1.default)(value).valueOf() }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.gender'), children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { onChange: (e) => {
                                update({
                                    gender: e.target
                                        .value,
                                });
                            }, value: data.gender, children: GenderOptions.map((ele, idx) => ((0, jsx_runtime_1.jsx)(antd_1.Radio, { value: ele.value, children: ele.label }, idx))) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.idCardType'), children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { onChange: (e) => {
                                update({
                                    idCardType: e.target
                                        .value,
                                });
                            }, value: data.idCardType, children: IDCardTypeOptions.map((ele, idx) => ((0, jsx_runtime_1.jsx)(antd_1.Radio, { value: ele.value, className: web_module_less_1.default.radio, children: ele.label }, idx))) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.idNumber'), children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: (e) => update({ idNumber: e.target.value }), value: data.idNumber || '' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", color: "primary", onClick: () => confirm(), children: t('common::action.confirm') }) })] }) }) }));
}
exports.default = Render;
