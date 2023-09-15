"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var dayjs_1 = tslib_1.__importDefault(require("dayjs"));
var avatar_1 = tslib_1.__importDefault(require("../../../components/extraFile/avatar"));
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, clean = methods.clean, setAvatar = methods.setAvatar, setVisible = methods.setVisible, goAddMobile = methods.goAddMobile, refreshWechatPublicUserInfo = methods.refreshWechatPublicUserInfo, goChangePassword = methods.goChangePassword;
    var oakFullpath = data.oakFullpath, visible = data.visible, nickname = data.nickname, name = data.name, birth = data.birth, gender = data.gender, mobile = data.mobile, avatarUrl = data.avatarUrl, attr = data.attr, id = data.id, isSupportSyncWeChat = data.isSupportSyncWeChat, refreshing = data.refreshing;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { className: mobile_module_less_1.default.list, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 5, marginBottom: 5 }, children: (0, jsx_runtime_1.jsx)(avatar_1.default, { oakAutoUnmount: true, oakPath: oakFullpath
                                    ? oakFullpath + '.extraFile$entity'
                                    : undefined, entity: "user", entityId: id }) }), children: "\u5934\u50CF" }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: nickname ? nickname : '未设置', onClick: function () {
                            setVisible(true, 'nickname');
                        }, children: t('user:attr.nickname') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: gender ? t("user:v.gender.".concat(gender)) : '未设置', onClick: function () {
                            setVisible(true, 'gender');
                        }, children: t('user:attr.gender') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: birth ? (0, dayjs_1.default)(birth).format('YYYY-MM-DD') : '未设置', onClick: function () {
                            setVisible(true, 'birth');
                        }, children: t('user:attr.birth') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: mobile ? mobile : '未设置', onClick: function () {
                            goAddMobile();
                        }, children: t('mobile') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: '********', onClick: function () {
                            goChangePassword();
                        }, children: t('password') })] }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Popup, { visible: visible, onMaskClick: function () {
                    clean();
                    setVisible(false, attr);
                }, bodyStyle: {
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '20vh',
                }, children: (0, jsx_runtime_1.jsx)(AttrUpsert, { data: data, methods: methods }) })] }));
}
exports.default = render;
function AttrUpsert(props) {
    var _this = this;
    var data = props.data, methods = props.methods;
    var attr = data.attr, genderOptions = data.genderOptions, attrs = data.attrs;
    var setCustomData = methods.setCustomData, onConfirm = methods.onConfirm, setVisible = methods.setVisible;
    var label = attrs[attr];
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { footer: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, type: "submit", color: "primary", size: "large", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, onConfirm(attr)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, children: "\u63D0\u4EA4" }), children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Header, { children: "\u4FEE\u6539\u4FE1\u606F" }), attr === 'nickname' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { name: attr, label: label, rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: "\u8BF7\u8F93\u5165".concat(label), defaultValue: data[attr], onChange: function (value) {
                            setCustomData(attr, value);
                        } }) })), attr === 'gender' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { name: attr, label: label, rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, { defaultValue: data[attr], onChange: function (value) {
                            setCustomData(attr, value);
                        }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: "vertical", children: genderOptions.map(function (ele) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, { value: ele.value, children: ele.label })); }) }) }) })), attr === 'birth' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { name: attr, label: label, onClick: function (e, datePickerRef) {
                        var _a;
                        (_a = datePickerRef.current) === null || _a === void 0 ? void 0 : _a.open();
                    }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.DatePicker, { defaultValue: data[attr] ? (0, dayjs_1.default)(data[attr]).toDate() : null, onConfirm: function (value) {
                            setCustomData(attr, (0, dayjs_1.default)(value).startOf('day').valueOf());
                        }, max: (0, dayjs_1.default)().toDate(), children: function (value) {
                            return value
                                ? (0, dayjs_1.default)(value).format('YYYY-MM-DD')
                                : '请选择日期';
                        } }) }))] }) }));
}
