"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var PickArea = ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.RightOutlined, { style: { fontSize: 12 } }), onClick: function () { return _this.callAreaPicker(); } }));
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: false, layout: "vertical" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: this.t('address:attr.name'), name: "name", help: ((_a = this.state.oakFocused) === null || _a === void 0 ? void 0 : _a.attr) === 'name'
                            ? this.state.oakFocused.message
                            : undefined }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u59D3\u540D", onChange: function (e) { return _this.setUpdateData('name', e.target.value); }, value: this.state.name, "data-attr": "name", status: ((_b = this.state.oakFocused) === null || _b === void 0 ? void 0 : _b.attr) === 'name'
                                ? 'error'
                                : undefined }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: this.t('address:attr.phone'), name: "phone", help: ((_c = this.state.oakFocused) === null || _c === void 0 ? void 0 : _c.attr) === 'phone'
                            ? this.state.oakFocused.message
                            : undefined }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u624B\u673A\u53F7", onChange: function (e) { return _this.setUpdateData('phone', e.target.value); }, value: this.state.phone, "data-attr": "phone", status: ((_d = this.state.oakFocused) === null || _d === void 0 ? void 0 : _d.attr) === 'phone'
                                ? 'error'
                                : undefined }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: this.t('address:attr.area'), name: "areaText", help: ((_e = this.state.oakFocused) === null || _e === void 0 ? void 0 : _e.attr) === 'areaId'
                            ? this.state.oakFocused.message
                            : undefined }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { addonBefore: PickArea, placeholder: "\u6240\u5728\u5730\u533A", onChange: this.setValue, value: this.state.areaText, "data-attr": "areaText", disabled: true, status: ((_f = this.state.oakFocused) === null || _f === void 0 ? void 0 : _f.attr) === 'areaId'
                                ? 'error'
                                : undefined }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: this.t('address:attr.detail'), name: "detail", help: ((_g = this.state.oakFocused) === null || _g === void 0 ? void 0 : _g.attr) === 'detail'
                            ? this.state.oakFocused.message
                            : undefined }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.TextArea, { maxLength: 100, onChange: function (e) {
                                return _this.setUpdateData('detail', e.target.value);
                            }, value: this.state.detail, "data-attr": "detail", placeholder: "\u8BE6\u7EC6\u5730\u5740", status: ((_h = this.state.oakFocused) === null || _h === void 0 ? void 0 : _h.attr) === 'detail'
                                ? 'error'
                                : undefined }) }))] })), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, disabled: this.state.oakAllowExecuting !== true, type: "primary", onClick: function () {
                    _this.confirm();
                } }, { children: this.t('common:action.confirm') }))] })));
}
exports.default = render;
