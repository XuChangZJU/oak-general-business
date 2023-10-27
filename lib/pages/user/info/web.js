"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const avatar_1 = tslib_1.__importDefault(require("../../../components/extraFile/avatar"));
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    const { data, methods } = props;
    const { t, clean, setAvatar, setVisible, goAddMobile, refreshWechatPublicUserInfo, goChangePassword, } = methods;
    const { oakFullpath, visible, nickname, name, birth, gender, mobile, avatarUrl, attr, id, isSupportSyncWeChat, refreshing, } = data;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_mobile_1.List, { className: mobile_module_less_1.default.list, children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: (0, jsx_runtime_1.jsx)("div", { style: { marginTop: 5, marginBottom: 5 }, children: (0, jsx_runtime_1.jsx)(avatar_1.default, { oakAutoUnmount: true, oakPath: oakFullpath
                                    ? oakFullpath + '.extraFile$entity'
                                    : undefined, entity: "user", entityId: id, autoUpload: true }) }), children: "\u5934\u50CF" }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: nickname ? nickname : '未设置', onClick: () => {
                            setVisible(true, 'nickname');
                        }, children: t('user:attr.nickname') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: gender ? t(`user:v.gender.${gender}`) : '未设置', onClick: () => {
                            setVisible(true, 'gender');
                        }, children: t('user:attr.gender') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: birth ? (0, dayjs_1.default)(birth).format('YYYY-MM-DD') : '未设置', onClick: () => {
                            setVisible(true, 'birth');
                        }, children: t('user:attr.birth') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: mobile ? mobile : '未设置', onClick: () => {
                            goAddMobile();
                        }, children: t('mobile') }), (0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { extra: '********', onClick: () => {
                            goChangePassword();
                        }, children: t('password') })] }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Popup, { visible: visible, onMaskClick: () => {
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
    const { data, methods } = props;
    const { attr, genderOptions, attrs } = data;
    const { setCustomData, onConfirm, setVisible } = methods;
    const label = attrs[attr];
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_mobile_1.Form, { footer: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, type: "submit", color: "primary", size: "large", onClick: async () => {
                    await onConfirm(attr);
                }, children: "\u63D0\u4EA4" }), children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Header, { children: "\u4FEE\u6539\u4FE1\u606F" }), attr === 'nickname' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { name: attr, label: label, rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Input, { placeholder: `请输入${label}`, defaultValue: data[attr], onChange: (value) => {
                            setCustomData(attr, value);
                        } }) })), attr === 'gender' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { name: attr, label: label, rules: [{ required: true }], children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Radio.Group, { defaultValue: data[attr], onChange: (value) => {
                            setCustomData(attr, value);
                        }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { direction: "vertical", children: genderOptions.map((ele) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Radio, { value: ele.value, children: ele.label }))) }) }) })), attr === 'birth' && ((0, jsx_runtime_1.jsx)(antd_mobile_1.Form.Item, { name: attr, label: label, onClick: (e, datePickerRef) => {
                        datePickerRef.current?.open();
                    }, children: (0, jsx_runtime_1.jsx)(antd_mobile_1.DatePicker, { defaultValue: data[attr] ? (0, dayjs_1.default)(data[attr]).toDate() : null, onConfirm: (value) => {
                            setCustomData(attr, (0, dayjs_1.default)(value).startOf('day').valueOf());
                        }, max: (0, dayjs_1.default)().toDate(), children: (value) => value
                            ? (0, dayjs_1.default)(value).format('YYYY-MM-DD')
                            : '请选择日期' }) }))] }) }));
}
