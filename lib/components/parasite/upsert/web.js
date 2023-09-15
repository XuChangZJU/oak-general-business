"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const detail_1 = tslib_1.__importDefault(require("../detail"));
function Render(props) {
    const { methods, data } = props;
    const { entity, entityId, relation, period, parasiteId, options, nameLabel, nameRequired, } = props.data;
    const { setPeriod, confirm, setInit, onSelect, onSearch, setSearchValue } = methods;
    if (!!parasiteId) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(detail_1.default, { oakId: parasiteId, oakAutoUnmount: true, oakPath: "$parasite/upsert-parasite/detail" }), (0, jsx_runtime_1.jsx)("div", { style: {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                            setInit();
                        }, children: "\u91CD\u65B0\u751F\u6210" }) })] }));
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: nameLabel || '名称', required: nameRequired, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.AutoComplete, { options: options, style: { width: 200 }, onSelect: onSelect, onSearch: (text) => onSearch(text), placeholder: "\u8BF7\u8F93\u5165", onChange: (value) => {
                                    setSearchValue(value);
                                } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u6709\u6548\u671F", required: true, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: 30, placeholder: "\u8BF7\u8F93\u5165", onChange: (value) => {
                                    setPeriod(value);
                                }, value: period, addonAfter: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: "\u5929" }) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                                    confirm();
                                }, children: "\u63D0\u4EA4" }) }) })] }) }) }));
}
exports.default = Render;
