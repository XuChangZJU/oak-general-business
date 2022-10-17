"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var FormItem = tdesign_react_1.Form.FormItem;
function render() {
    var _this = this;
    var _a = this.state, gender = _a.gender, birth = _a.birth, GenderOptions = _a.GenderOptions, IDCardTypeOptions = _a.IDCardTypeOptions;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Row, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ xs: 12, sm: 4 }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Form, tslib_1.__assign({ labelWidth: "100px", colon: true }, { children: [(0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u6635\u79F0", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                        _this.setUpdateData('nickname', value);
                                    }, value: this.state.nickname }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u59D3\u540D", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                        _this.setUpdateData('name', value);
                                    }, value: this.state.name }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u51FA\u751F\u65E5\u671F", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.DatePicker, { allowInput: false, clearable: false, enableTimePicker: false, mode: "date", presetsPlacement: "bottom", value: this.state.birth
                                        ? (0, dayjs_1.default)(this.state.birth).format('YYYY-MM-DD')
                                        : '', onChange: function (value) {
                                        var val = (0, dayjs_1.default)(value).valueOf();
                                        _this.setUpdateData('birth', val);
                                    }, valueType: "YYYY-MM-DD" }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u6027\u522B", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Radio.Group, { options: GenderOptions, onChange: function (value) {
                                        _this.setUpdateData('gender', value);
                                    }, value: this.state.gender }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u8BC1\u4EF6\u7C7B\u522B", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Radio.Group, { options: IDCardTypeOptions, onChange: function (value) {
                                        _this.setUpdateData('idCardType', value);
                                    }, value: this.state.idCardType }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u8BC1\u4EF6\u53F7", requiredMark: true }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value) {
                                        _this.setUpdateData('idNumber', value);
                                    } }) }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ style: { marginLeft: 100 } }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", onClick: function (event) {
                                    _this.confirm();
                                } }, { children: "\u786E\u5B9A" })) }))] })) })) }) })));
}
exports.default = render;
