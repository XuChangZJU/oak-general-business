"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function Render(props) {
    var _this = this;
    var data = props.data, methods = props.methods;
    var user = data.user, failTimes = data.failTimes;
    var onConfirm = methods.onConfirm;
    var _a = tslib_1.__read((0, react_1.useState)(''), 2), password2 = _a[0], setPassword2 = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), password = _b[0], setPassword = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), prevPassword = _c[0], setPrevPassword = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp0 = _d[0], setValidateHelp0 = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), validateStatus0 = _e[0], setValidateStatus0 = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp = _f[0], setValidateHelp = _f[1];
    var _g = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp1 = _g[0], setValidateHelp1 = _g[1];
    var _h = tslib_1.__read((0, react_1.useState)(''), 2), validateStatus = _h[0], setValidateStatus = _h[1];
    var reset = function () {
        setPassword2(function () { return ''; });
        setPassword(function () { return ''; });
        setPrevPassword(function () { return ''; });
        setValidateHelp0(function () { return ''; });
        setValidateStatus0(function () { return ''; });
        setValidateHelp(function () { return ''; });
        setValidateHelp1(function () { return ''; });
        setValidateStatus(function () { return ''; });
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [failTimes >= 5 && (0, jsx_runtime_1.jsx)(antd_1.Alert, { message: "\u60A8\u4ECA\u65E5\u5C1D\u8BD5\u6B21\u6570\u8FC7\u591A\uFF0C\u8BF7\u7A0D\u5019\u518D\u8FDB\u884C\u64CD\u4F5C\u6216\u4F7F\u7528\u624B\u673A\u53F7\u9A8C\u8BC1", type: "error", style: { marginBottom: 20 } }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '输入原密码', name: "prevPassword", help: validateHelp0, rules: [
                    {
                        required: true,
                        message: '请输入原密码',
                        validator: function (_, value) {
                            if (!value) {
                                setValidateHelp0('必须填写原密码');
                                setValidateStatus0('error');
                                return;
                            }
                            else {
                                setValidateHelp0('');
                                setValidateStatus0('');
                            }
                        }
                    },
                ], hasFeedback: true, validateStatus: validateStatus0, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: prevPassword, onChange: function (e) {
                        var strValue = e.target.value;
                        setPrevPassword(strValue);
                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: '请输入原密码' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '输入新密码', name: "password", help: validateHelp1, rules: [
                    {
                        required: true,
                        message: '请输入新密码',
                        validator: function (_, value) {
                            if (value.length < 8) {
                                setValidateHelp1('密码最短长度为8位');
                                setValidateStatus('error');
                                return;
                            }
                            else {
                                setValidateHelp1('');
                                setValidateStatus('');
                            }
                            if (password2) {
                                setValidateHelp(value === password2 ? '' : '两次输入的密码不一致，请检查');
                                setValidateStatus(value === password2 ? 'success' : 'error');
                            }
                        }
                    },
                ], hasFeedback: true, validateStatus: validateStatus, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password, onChange: function (e) {
                        var strValue = e.target.value;
                        setPassword(strValue);
                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: '请输入新密码' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '确认新密码', name: "passwordConfirm", rules: [
                    {
                        required: true,
                        validator: function (_, value) {
                            if (password.length < 8) {
                                return;
                            }
                            setValidateHelp(value === password ? '' : '两次输入的密码不一致，请检查');
                            setValidateStatus(value === password ? 'success' : 'error');
                        }
                    },
                ], validateTrigger: "onChange", help: validateHelp, validateStatus: validateStatus, hasFeedback: true, children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password2, onChange: function (e) {
                        var strValue = e.target.value;
                        setPassword2(strValue);
                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: '请再次输入密码' }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: { offset: 4 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", type: "primary", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, onConfirm(prevPassword, password)];
                                        case 1:
                                            _a.sent();
                                            reset();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, disabled: !(failTimes < 5 && prevPassword && password && password.length >= 8 && password === password2), children: "\u63D0\u4EA4" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { htmlType: "reset", onClick: reset, children: "\u91CD\u7F6E" })] }) })] }));
}
exports.default = Render;
