"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const avatar_1 = tslib_1.__importDefault(require("../../../components/extraFile/avatar"));
const commit_1 = tslib_1.__importDefault(require("../../../components/extraFile/commit"));
const login_1 = tslib_1.__importDefault(require("../../../pages/mobile/login"));
const qrCode_1 = tslib_1.__importDefault(require("../../../components/wechatLogin/qrCode"));
const bindingList_1 = tslib_1.__importDefault(require("../../../components/wechatUser/bindingList"));
const validator_1 = require("oak-domain/lib/utils/validator");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { data, methods } = props;
    const { t, updateMyInfo, goAddMobile, sendCaptcha, unbindingWechat, goChangePassword, goUserManage, } = methods;
    const { nickname, name, birth, gender, mobile, avatarUrl, showBack, oakExecuting, genderOptions, oakFullpath, oakDirty, wechatUser, counter, isRoot, } = data;
    const [open, setOpen] = (0, react_1.useState)(false);
    const [open2, setOpen2] = (0, react_1.useState)(false);
    const [open3, setOpen3] = (0, react_1.useState)(false);
    const [captcha, setCaptcha] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, { title: "\u4E2A\u4EBA\u4FE1\u606F", showBack: showBack, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions, { title: '基本信息' }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('avatar'), name: "extraFile$entity", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(avatar_1.default, { oakAutoUnmount: true, oakPath: oakFullpath
                                            ? oakFullpath + '.extraFile$entity'
                                            : undefined, entity: "user" }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.name'), rules: [
                                    {
                                        required: true,
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "", onChange: (e) => methods.update({
                                            name: e.target.value,
                                        }), value: name }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.nickname'), rules: [
                                    {
                                        required: true,
                                    },
                                ], children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "", onChange: (e) => methods.update({
                                            nickname: e.target.value,
                                        }), value: nickname }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.gender'), children: (0, jsx_runtime_1.jsx)(antd_1.Space, { direction: "vertical", children: (0, jsx_runtime_1.jsx)(antd_1.Radio.Group, { value: data.gender, options: genderOptions, onChange: ({ target: { value } }) => {
                                            methods.update({ gender: value });
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.birth'), children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.DatePicker, { placeholder: "\u8BF7\u9009\u62E9", format: "YYYY-MM-DD", inputReadOnly: true, allowClear: false, value: birth ? (0, dayjs_1.default)(birth) : undefined, disabledDate: (current) => {
                                            if ((0, dayjs_1.default)(current).valueOf() >
                                                (0, dayjs_1.default)().valueOf()) {
                                                return true;
                                            }
                                            return false;
                                        }, onChange: (value) => {
                                            if (value) {
                                                methods.update({
                                                    birth: (0, dayjs_1.default)(value).valueOf(),
                                                });
                                            }
                                        } }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { wrapperCol: {
                                    xs: { offset: 4 },
                                    md: { offset: 6 },
                                }, children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: (0, jsx_runtime_1.jsx)(commit_1.default, { oakPath: oakFullpath }) }) })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: '10px' } }), (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions, { title: '安全信息' }), (0, jsx_runtime_1.jsxs)(antd_1.Form, { labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('mobile'), children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: mobile || '未设置' }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: () => {
                                                if (mobile) {
                                                    goAddMobile();
                                                    return;
                                                }
                                                setOpen(true);
                                            }, children: mobile ? t('manage') : t('bind') })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: t('user:attr.password'), children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: '********' }), (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: () => {
                                                goChangePassword();
                                                return;
                                            }, children: t('manage') })] }) }), process.env.NODE_ENV === 'development' && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5FAE\u4FE1\u5E10\u53F7", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: wechatUser ? ((0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Typography, { children: wechatUser.nickname }), (0, jsx_runtime_1.jsx)(bindingList_1.default, { oakPath: oakFullpath
                                                    ? `${oakFullpath}.wechatUser$user`
                                                    : undefined })] })) : ((0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: () => {
                                            setOpen2(true);
                                        }, children: "\u7ED1\u5B9A" })) }) })), isRoot && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '系统用户', tooltip: "\u8D85\u7EA7\u7BA1\u7406\u5458\u53EF\u5BF9\u7CFB\u7EDF\u7528\u6237\u8FDB\u884C\u7BA1\u7406", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "small", onClick: () => {
                                        goUserManage();
                                    }, children: t('manage') }) }))] })] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: () => {
                    setOpen(false);
                }, children: (0, jsx_runtime_1.jsx)(login_1.default, { callback: () => {
                        setOpen(false);
                    }, oakPath: "$user/info-mobile/login", oakAutoUnmount: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u7ED1\u5B9A\u5FAE\u4FE1", open: open2, destroyOnClose: true, footer: null, maskClosable: false, onCancel: () => {
                    setOpen2(false);
                }, children: (0, jsx_runtime_1.jsx)(qrCode_1.default, { oakPath: "$user/info-wechatLogin/qrCode", oakAutoUnmount: true }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: t('Mobile-Number-Verification'), open: open3, destroyOnClose: true, footer: [
                    (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => setOpen3(false), children: t('cancel') }, "cancel"),
                    (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", disabled: !(0, validator_1.isCaptcha)(captcha), onClick: () => {
                            unbindingWechat(captcha);
                            setOpen3(false);
                        }, children: t('unbind') }, "send"),
                ], maskClosable: false, onCancel: () => {
                    setOpen3(false);
                }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", style: { width: '100%' }, children: [(0, jsx_runtime_1.jsxs)(antd_1.Typography, { children: ["\u8BF7\u8F93\u5165", mobile &&
                                    mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), "\u6536\u5230\u7684\u9A8C\u8BC1\u7801"] }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { name: "captcha", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                                // type="number"
                                maxLength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: (e) => {
                                    setCaptcha(e.target.value);
                                }, className: web_module_less_1.default['loginbox-input'], suffix: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", disabled: counter > 0, onClick: () => sendCaptcha(), children: counter > 0
                                        ? `${counter}秒后可重发`
                                        : t('send') }) }) })] }) })] }));
}
exports.default = Render;
