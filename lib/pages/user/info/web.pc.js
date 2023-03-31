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
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, updateMyInfo = methods.updateMyInfo, goAddMobile = methods.goAddMobile;
    var nickname = data.nickname, name = data.name, birth = data.birth, gender = data.gender, mobile = data.mobile, avatarUrl = data.avatarUrl, showBack = data.showBack, oakExecuting = data.oakExecuting, genderOptions = data.genderOptions, oakFullpath = data.oakFullpath, oakDirty = data.oakDirty;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), open = _a[0], setOpen = _a[1];
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, tslib_1.__assign({ title: "\u4FEE\u6539\u4E2A\u4EBA\u4FE1\u606F", showBack: showBack }, { children: [(0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('avatar'), name: "extraFile$entity" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(avatar_1.default, { oakAutoUnmount: true, oakPath: oakFullpath
                                        ? oakFullpath + '.extraFile$entity'
                                        : undefined, entity: "user" }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.name'), name: "name", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "", onChange: function (e) {
                                        return methods.update({
                                            name: e.target.value,
                                        });
                                    }, value: name }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.nickname'), name: "nickname", rules: [
                                {
                                    required: true,
                                },
                            ] }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "", onChange: function (e) {
                                        return methods.update({
                                            nickname: e.target.value,
                                        });
                                    }, value: nickname }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ name: "gender", label: t('user:attr.gender') }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: data.gender, options: genderOptions, onChange: function (_a) {
                                        var value = _a.target.value;
                                        methods.update({ gender: value });
                                    } }) })) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('user:attr.birth'), name: "birth" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, { placeholder: "\u8BF7\u9009\u62E9", format: "YYYY-MM-DD", inputReadOnly: true, allowClear: false, value: birth ? (0, dayjs_1.default)(birth) : undefined, disabledDate: function (current) {
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
                                    } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: t('mobile') }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: mobile || '未设置' }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "small", onClick: function () {
                                                if (mobile) {
                                                    goAddMobile();
                                                    return;
                                                }
                                                setOpen(true);
                                            } }, { children: mobile ? t('manage') : t('bind') }))] }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ wrapperCol: {
                                xs: { offset: 4 },
                                md: { offset: 6 },
                            } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ disabled: oakExecuting || !oakDirty, type: "primary", onClick: function () {
                                        updateMyInfo();
                                    } }, { children: "\u786E\u5B9A" })) }) }))] })) })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: function () {
                    setOpen(false);
                } }, { children: (0, jsx_runtime_1.jsx)(login_1.default, { callback: function () {
                        setOpen(false);
                    }, oakPath: "$user/info-mobile/login", oakAutoUnmount: true }) }))] })));
}
exports.default = Render;
