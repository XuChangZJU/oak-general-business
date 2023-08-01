"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var detail_1 = tslib_1.__importDefault(require("../detail"));
function Render(props) {
    var methods = props.methods, data = props.data;
    var _a = props.data, entity = _a.entity, entityId = _a.entityId, relation = _a.relation, period = _a.period, parasiteId = _a.parasiteId, options = _a.options;
    var setPeriod = methods.setPeriod, confirm = methods.confirm, setInit = methods.setInit, onSelect = methods.onSelect, onSearch = methods.onSearch, setSearchValue = methods.setSearchValue;
    if (!!parasiteId) {
        return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(detail_1.default, { oakId: parasiteId, oakAutoUnmount: true, oakPath: "$parasite/upsert-parasite/detail" }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                            setInit();
                        } }, { children: "\u91CD\u65B0\u751F\u6210" })) }))] })));
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u540D\u79F0" }, { children: (0, jsx_runtime_1.jsx)(antd_1.AutoComplete, { options: options, style: { width: 200 }, onSelect: onSelect, onSearch: function (text) { return onSearch(text); }, placeholder: "\u8BF7\u8F93\u5165", onChange: function (value) {
                                setSearchValue(value);
                            } }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6709\u6548\u671F" }, { children: (0, jsx_runtime_1.jsx)(antd_1.InputNumber, { min: 1, max: 30, placeholder: "\u8BF7\u8F93\u5165", onChange: function (value) {
                                setPeriod(value);
                            }, value: period, addonAfter: (0, jsx_runtime_1.jsx)(antd_1.Typography, { children: "\u5929" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                                    confirm();
                                } }, { children: "\u63D0\u4EA4" })) }) }))] })) })) }));
}
exports.default = Render;
