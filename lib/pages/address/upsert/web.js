"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_mobile_1 = require("antd-mobile");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var types_1 = require("oak-domain/lib/types");
var assert_1 = require("oak-domain/lib/utils/assert");
function Render(props) {
    var _this = this;
    var _a = props.methods, callAreaPicker = _a.callAreaPicker, t = _a.t, confirm = _a.confirm, update = _a.update;
    var data = props.data;
    var inputName = (0, react_1.useRef)(null);
    var inputPhone = (0, react_1.useRef)(null);
    var inputDetail = (0, react_1.useRef)(null);
    var _b = tslib_1.__read((0, react_1.useState)({}), 2), help = _b[0], setHelp = _b[1];
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { layout: "horizontal", children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.name'), name: "name", help: help.name, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u59D3\u540D", onChange: function (v) { return update({ name: v }); }, value: data.name, "data-attr": "name", ref: inputName }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.phone'), name: "phone", help: help.phone, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u624B\u673A\u53F7", onChange: function (v) { return update({ phone: v }); }, value: data.phone, "data-attr": "phone", ref: inputPhone }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.area'), name: "areaText", arrow: true, onClick: function () { return callAreaPicker(); }, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u6240\u5728\u5730\u533A", value: data.areaText, "data-attr": "areaText", readOnly: true }) }) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { label: t('address:attr.detail'), name: "detail", help: help.detail, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.TextArea, { maxLength: 100, onChange: function (v) { return update({ detail: v }); }, value: data.detail || undefined, "data-attr": "detail", placeholder: "\u8BE6\u7EC6\u5730\u5740", ref: inputDetail, showCount: true }) }) })] }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, disabled: !data.oakDirty || data.oakExecuting, loading: data.oakExecuting, color: "primary", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var err_1, _a, attr;
                    var _b;
                    var _c, _d, _e;
                    return tslib_1.__generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _f.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, confirm()];
                            case 1:
                                _f.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _f.sent();
                                if (err_1 instanceof types_1.OakInputIllegalException) {
                                    _a = tslib_1.__read(err_1.getAttributes(), 1), attr = _a[0];
                                    switch (attr) {
                                        case 'name': {
                                            (_c = inputName.current) === null || _c === void 0 ? void 0 : _c.focus();
                                            break;
                                        }
                                        case 'phone': {
                                            (_d = inputPhone.current) === null || _d === void 0 ? void 0 : _d.focus();
                                            break;
                                        }
                                        case 'detail': {
                                            (_e = inputDetail.current) === null || _e === void 0 ? void 0 : _e.focus();
                                            break;
                                        }
                                        default: {
                                            (0, assert_1.assert)(false);
                                        }
                                    }
                                    setHelp((_b = {},
                                        _b[attr] = err_1.message,
                                        _b));
                                }
                                throw err_1;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, children: t('common::action.confirm') })] }));
}
exports.default = Render;
