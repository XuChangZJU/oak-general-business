"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render() {
    var _this = this;
    var _a = this.props, relations = _a.relations, entity = _a.entity;
    var _b = this.state, name = _b.name, mobile = _b.mobile, password = _b.password, relationArr = _b.relationArr;
    var relationArr2 = typeof relations === 'object'
        ? relations
        : relations && JSON.parse(relations);
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u59D3\u540D", name: "name", rules: [
                        {
                            required: true,
                            message: '姓名不能为空',
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { onChange: function (e) {
                                _this.setUpdateData('name', e.target.value);
                            }, value: name, placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u624B\u673A\u53F7\u7801", name: "mobile", rules: [
                        {
                            required: true,
                            message: '手机号不能为空',
                        },
                        {
                            min: 11,
                            message: '请输入11位手机号',
                        },
                        {
                            max: 11,
                            message: '请输入11位手机号',
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { maxLength: 11, value: mobile, onChange: function (e) {
                                var strValue = e.target.value;
                                _this.setUpdateData('mobile$user.0.mobile', strValue.replace(/[^\d\-\d]/g, ''));
                            }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801", type: "tel" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u5BC6\u7801", name: "mobile", rules: [
                        {
                            required: true,
                            message: '密码不能为空',
                        },
                    ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { value: password, onChange: function (e) {
                                _this.setUpdateData('password', e.target.value);
                            }, placeholder: "\u4E0D\u5C11\u4E8E\u516B\u4F4D" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6743\u9650", rules: [
                        {
                            required: true,
                            message: '请至少选择一个权限',
                        },
                    ], name: "relation" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox.Group, { value: relationArr, onChange: function (value) {
                                _this.setRelationValue(value);
                            }, options: relationArr2.map(function (ele) { return ({
                                value: ele,
                                label: (_this.t && _this.t(entity + ':r.' + ele)) ||
                                    ele,
                            }); }) }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", htmlType: "submit", onClick: function () {
                                    _this.onConfirm();
                                } }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset" }, { children: "\u91CD\u7F6E" }))] }) }))] })) })));
}
exports.default = render;
