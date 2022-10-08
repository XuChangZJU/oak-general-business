"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_react_1 = require("tdesign-react");
var FormItem = tdesign_react_1.Form.FormItem;
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render() {
    var _this = this;
    var _a = this.props, relations = _a.relations, entity = _a.entity;
    var _b = this.state, name = _b.name, mobile = _b.mobile, password = _b.password, relationArr = _b.relationArr;
    var relationArr2 = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.pageWithPadding }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.formContainer }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Row, tslib_1.__assign({ gutter: 16 }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Col, tslib_1.__assign({ span: 8 }, { children: (0, jsx_runtime_1.jsxs)(tdesign_react_1.Form, tslib_1.__assign({ colon: false, labelAlign: "right", labelWidth: "100px", layout: "vertical", preventSubmitDefault: true, resetType: "empty", showErrorMessage: true, submitWithWarningMessage: false }, { children: [(0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u59D3\u540D", name: "name", rules: [
                                    {
                                        required: true,
                                        message: '姓名不能为空',
                                        type: 'error',
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value, context) {
                                        _this.setUpdateData('name', value);
                                    }, value: name, align: "left", placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9", type: "text" }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u624B\u673A\u53F7\u7801", name: "mobile", rules: [
                                    {
                                        required: true,
                                        message: '手机号不能为空',
                                        type: 'error',
                                    },
                                    {
                                        min: 11,
                                        message: '请输入11位手机号',
                                        type: 'error',
                                    },
                                    {
                                        max: 11,
                                        message: '请输入11位手机号',
                                        type: 'error',
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { onChange: function (value, context) {
                                        _this.setUpdateData('mobile$user.0.mobile', value);
                                    }, maxlength: 11, value: mobile, align: "left", placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9", size: "medium", type: "tel" }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ initialData: "12345678", label: "\u5BC6\u7801", name: "mobile", rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空',
                                        type: 'error',
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Input, { value: password, onChange: function (value) {
                                        _this.setUpdateData('password', value);
                                    }, align: "left", placeholder: "\u4E0D\u5C11\u4E8E\u516B\u4F4D", showClearIconOnEmpty: false, size: "medium", status: "default", type: "text" }) })), (0, jsx_runtime_1.jsx)(FormItem, tslib_1.__assign({ label: "\u6743\u9650", rules: [
                                    {
                                        required: true,
                                        message: '请至少选择一个权限',
                                        type: 'error',
                                    },
                                ] }, { children: (0, jsx_runtime_1.jsx)(tdesign_react_1.Checkbox.Group, { value: relationArr, onChange: function (value) {
                                        _this.setRelationValue(value);
                                    }, options: relationArr2.map(function (ele) { return ({
                                        value: ele,
                                        label: (_this.t &&
                                            _this.t(entity + ':r.' + ele)) ||
                                            ele,
                                    }); }) }) })), (0, jsx_runtime_1.jsxs)(FormItem, tslib_1.__assign({ style: { marginLeft: 100 } }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", type: "submit", style: { marginRight: 10 }, onClick: function () {
                                            _this.onConfirm();
                                        } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "default", type: "reset" }, { children: "\u91CD\u7F6E" }))] }))] })) })) })) })) })));
}
exports.default = render;
