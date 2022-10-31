"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.state, gender = _a.gender, birth = _a.birth, GenderOptions = _a.GenderOptions, IDCardTypeOptions = _a.IDCardTypeOptions;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 12, sm: 4 }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6635\u79F0", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        _this.setUpdateData('nickname', e.target.value);
                                    }, value: this.state.nickname }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u59D3\u540D", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        _this.setUpdateData('name', e.target.value);
                                    }, value: this.state.name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u51FA\u751F\u65E5\u671F", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, { allowClear: false, mode: "date", value: (this.state.birth
                                        ? (0, dayjs_1.default)(this.state.birth).format('YYYY-MM-DD')
                                        : ''), onChange: function (value) {
                                        var val = (0, dayjs_1.default)(value).valueOf();
                                        _this.setUpdateData('birth', val);
                                    }, format: "YYYY-MM-DD" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6027\u522B", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { options: GenderOptions, onChange: function (e) {
                                        _this.setUpdateData('gender', e.target.value);
                                    }, value: this.state.gender }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u8BC1\u4EF6\u7C7B\u522B", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { options: IDCardTypeOptions, onChange: function (e) {
                                        _this.setUpdateData('idCardType', e.target.value);
                                    }, value: this.state.idCardType }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u8BC1\u4EF6\u53F7", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                        _this.setUpdateData('idNumber', e.target.value);
                                    } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function (event) {
                                    _this.confirm();
                                } }, { children: "\u786E\u5B9A" })) })] })) })) }) })));
}
exports.default = render;
