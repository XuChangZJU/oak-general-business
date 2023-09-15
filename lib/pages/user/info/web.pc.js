"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var avatar_1 = tslib_1.__importDefault(require("../../../components/extraFile/avatar"));
var login_1 = tslib_1.__importDefault(require("../../../pages/mobile/login"));
var qrCode_1 = tslib_1.__importDefault(require("../../../components/wechatLogin/qrCode"));
var bindingList_1 = tslib_1.__importDefault(require("../../../components/wechatUser/bindingList"));
var validator_1 = require("oak-domain/lib/utils/validator");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, updateMyInfo = methods.updateMyInfo, goAddMobile = methods.goAddMobile, sendCaptcha = methods.sendCaptcha, unbindingWechat = methods.unbindingWechat, goChangePassword = methods.goChangePassword, goUserManage = methods.goUserManage;
    var nickname = data.nickname, name = data.name, birth = data.birth, gender = data.gender, mobile = data.mobile, avatarUrl = data.avatarUrl, showBack = data.showBack, oakExecuting = data.oakExecuting, genderOptions = data.genderOptions, oakFullpath = data.oakFullpath, oakDirty = data.oakDirty, wechatUser = data.wechatUser, counter = data.counter, isRoot = data.isRoot;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), open = _a[0], setOpen = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), open2 = _b[0], setOpen2 = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(false), 2), open3 = _c[0], setOpen3 = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), captcha = _d[0], setCaptcha = _d[1];
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, { title: "\u4E2A\u4EBA\u4FE1\u606F", showBack: showBack, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions, { title: '基本信息' }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('avatar'), name: "extraFile$entity", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(avatar_1.default, { oakAutoUnmount: true, oakPath: oakFullpath
                                            ? oakFullpath + '.extraFile$entity'
                                            : undefined, entity: "user" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.name'), rules: [
                                    {
                                        required: true,
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "", onChange: function (e) {
                                            return methods.update({
                                                name: e.target.value,
                                            });
                                        }, value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.nickname'), rules: [
                                    {
                                        required: true,
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "", onChange: function (e) {
                                            return methods.update({
                                                nickname: e.target.value,
                                            });
                                        }, value: nickname }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.gender'), children: (0, jsx_runtime_1.jsx)(antd_1.Space, { direction: "vertical", children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: data.gender, options: genderOptions, onChange: function (_a) {
                                            var value = _a.target.value;
                                            methods.update({ gender: value });
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.birth'), children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, { placeholder: "\u8BF7\u9009\u62E9", format: "YYYY-MM-DD", inputReadOnly: true, allowClear: false, value: birth ? (0, dayjs_1.default)(birth) : undefined, disabledDate: function (current) {
                                            if ((0, dayjs_1.default)(current).valueOf() >
                                                (0, dayjs_1.default)().valueOf()) {
                                                return true;
                                            }
                                            return false;
                                        }, onChange: function (value) {
                                            if (value) {
                                                methods.update({
                                                    birth: (0, dayjs_1.default)(value).valueOf(),
                                                });
                                            }
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: {
                                    xs: { offset: 4 },
                                    md: { offset: 6 },
                                }, children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { disabled: oakExecuting || !oakDirty, type: "primary", onClick: function () {
                                            updateMyInfo();
                                        }, children: "\u786E\u5B9A" }) }) })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: '10px' } }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions, { title: '安全信息' }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('mobile'), children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: mobile || '未设置' }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: function () {
                                                if (mobile) {
                                                    goAddMobile();
                                                    return;
                                                }
                                                setOpen(true);
                                            }, children: mobile ? t('manage') : t('bind') })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.password'), children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: '********' }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: function () {
                                                goChangePassword();
                                                return;
                                            }, children: t('manage') })] }) }), process.env.NODE_ENV === 'development' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5FAE\u4FE1\u5E10\u53F7", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: wechatUser ? ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: wechatUser.nickname }), (0, jsx_runtime_1.jsx)(bindingList_1.default, { oakPath: oakFullpath
                                                    ? "".concat(oakFullpath, ".wechatUser$user")
                                                    : undefined })] })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: function () {
                                            setOpen2(true);
                                        }, children: "\u7ED1\u5B9A" })) }) })), isRoot && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '系统用户', tooltip: "\u8D85\u7EA7\u7BA1\u7406\u5458\u53EF\u5BF9\u7CFB\u7EDF\u7528\u6237\u8FDB\u884C\u7BA1\u7406", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: function () {
                                        goUserManage();
                                    }, children: t('manage') }) }))] })] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: function () {
                    setOpen(false);
                }, children: (0, jsx_runtime_1.jsx)(login_1.default, { callback: function () {
                        setOpen(false);
                    }, oakPath: "$user/info-mobile/login", oakAutoUnmount: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u7ED1\u5B9A\u5FAE\u4FE1", open: open2, destroyOnClose: true, footer: null, maskClosable: false, onCancel: function () {
                    setOpen2(false);
                }, children: (0, jsx_runtime_1.jsx)(qrCode_1.default, { oakPath: "$user/info-wechatLogin/qrCode", oakAutoUnmount: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: t('Mobile-Number-Verification'), open: open3, destroyOnClose: true, footer: [
                    (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () { return setOpen3(false); }, children: t('cancel') }, "cancel"),
                    (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", disabled: !(0, validator_1.isCaptcha)(captcha), onClick: function () {
                            unbindingWechat(captcha);
                            setOpen3(false);
                        }, children: t('unbind') }, "send"),
                ], maskClosable: false, onCancel: function () {
                    setOpen3(false);
                }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", style: { width: '100%' }, children: [(0, jsx_runtime_1.jsxs)(antd_1.Typography, { children: ["\u8BF7\u8F93\u5165", mobile &&
                                    mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), "\u6536\u5230\u7684\u9A8C\u8BC1\u7801"] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "captcha", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                                // type="number"
                                maxLength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: function (e) {
                                    setCaptcha(e.target.value);
                                }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", disabled: counter > 0, onClick: function () { return sendCaptcha(); }, children: counter > 0
                                        ? "".concat(counter, "\u79D2\u540E\u53EF\u91CD\u53D1")
                                        : t('send') }) }) })] }) })] }));
}
exports.default = Render;
