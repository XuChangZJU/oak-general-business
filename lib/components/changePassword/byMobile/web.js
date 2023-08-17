"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var icons_1 = require("@ant-design/icons");
function Render(props) {
    var _this = this;
    var _a;
    var data = props.data, methods = props.methods;
    var user = data.user, captcha = data.captcha, counter = data.counter, mobile = data.mobile;
    var setCaptcha = methods.setCaptcha, sendCaptcha = methods.sendCaptcha, onConfirmByMobile = methods.onConfirmByMobile, setMobile = methods.setMobile;
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), password = _b[0], setPassword = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), password2 = _c[0], setPassword2 = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp = _d[0], setValidateHelp = _d[1];
    var _e = tslib_1.__read((0, react_1.useState)(''), 2), validateHelp2 = _e[0], setValidateHelp2 = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), validateStatus = _f[0], setValidateStatus = _f[1];
    var reset = function () {
        setPassword2('');
        setPassword('');
        setValidateHelp('');
        setValidateHelp2('');
        setValidateStatus('');
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelCol: { span: 4 }, wrapperCol: { span: 8 } }, { children: [((user === null || user === void 0 ? void 0 : user.mobile$user) && ((_a = user === null || user === void 0 ? void 0 : user.mobile$user) === null || _a === void 0 ? void 0 : _a.length) > 0) && (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '手机号' }, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { defaultValue: user === null || user === void 0 ? void 0 : user.mobile$user[0].mobile, options: user === null || user === void 0 ? void 0 : user.mobile$user.map(function (ele) {
                        return {
                            label: ele.mobile,
                            value: ele.mobile,
                        };
                    }), value: mobile, onChange: function (value) {
                        setMobile(value);
                    } }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "captcha", label: '输入验证码' }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, size: "large", maxLength: 4, placeholder: '请输入验证码', onChange: function (e) {
                        setCaptcha(e.target.value);
                    }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", type: "link", disabled: (!mobile) || counter > 0, onClick: function () { return sendCaptcha(mobile); } }, { children: counter > 0 ? "".concat(counter, "\u79D2\u540E\u53EF\u91CD\u53D1") : '发送验证码' })) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '输入新密码', name: "password", help: validateHelp, rules: [
                    {
                        required: true,
                        message: '请输入密码',
                        validator: function (_, value) {
                            if (value.length < 8) {
                                setValidateHelp('密码最短长度为8位');
                                setValidateStatus('error');
                                return;
                            }
                            else {
                                setValidateHelp('');
                                setValidateStatus('');
                            }
                            if (password2) {
                                setValidateHelp(value === password2 ? '' : '两次输入的密码不一致，请检查');
                                setValidateStatus(value === password2 ? 'success' : 'error');
                            }
                        }
                    },
                ], hasFeedback: true, validateStatus: validateStatus }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password, onChange: function (e) {
                        var strValue = e.target.value;
                        setPassword(strValue);
                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: '请输入新密码' }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: '确认密码', name: "passwordConfirm", rules: [
                    {
                        required: true,
                        validator: function (_, value) {
                            if (password.length < 8) {
                                return;
                            }
                            setValidateHelp2(value === password ? '' : '两次输入的密码不一致，请检查');
                            setValidateStatus(value === password ? 'success' : 'error');
                        }
                    },
                ], validateTrigger: "onChange", help: validateHelp2, validateStatus: validateStatus, hasFeedback: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Input.Password, { value: password2, onChange: function (e) {
                        var strValue = e.target.value;
                        setPassword2(strValue);
                    }, iconRender: function (visible) { return (visible ? (0, jsx_runtime_1.jsx)(icons_1.EyeTwoTone, {}) : (0, jsx_runtime_1.jsx)(icons_1.EyeInvisibleOutlined, {})); }, placeholder: '请再次输入密码' }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: { offset: 4 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, onConfirmByMobile(mobile, captcha, password)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, disabled: !(password.length >= 8 && password === password2) }, { children: "\u63D0\u4EA4" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ htmlType: "reset", onClick: reset }, { children: "\u91CD\u7F6E" }))] }) }))] })));
}
exports.default = Render;
