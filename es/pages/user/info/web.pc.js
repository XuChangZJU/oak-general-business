import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Space, Button, Input, Radio, DatePicker, Form, Typography, Modal, Descriptions } from 'antd';
import dayjs from 'dayjs';
import PageHeader from '../../../components/common/pageHeader';
import OakAvatar from '../../../components/extraFile/avatar';
import MobileLogin from '../../../pages/mobile/login';
import WechatLoginQrCode from '../../../components/wechatLogin/qrCode';
import WechatUserList from '../../../components/wechatUser/bindingList';
import { isCaptcha, } from 'oak-domain/lib/utils/validator';
import Style from './web.module.less';
const { confirm } = Modal;
export default function Render(props) {
    const { data, methods } = props;
    const { t, updateMyInfo, goAddMobile, sendCaptcha, unbunding, goChangePassword } = methods;
    const { nickname, name, birth, gender, mobile, avatarUrl, showBack, oakExecuting, genderOptions, oakFullpath, oakDirty, wechatUser, counter, } = data;
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [captcha, setCaptcha] = useState('');
    return (_jsxs(PageHeader, { title: "\u4E2A\u4EBA\u4FE1\u606F", showBack: showBack, children: [_jsxs("div", { className: Style.container, children: [_jsx(Descriptions, { title: '基本信息' }), _jsxs(Form, { labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } }, children: [_jsx(Form.Item, { label: t('avatar'), name: "extraFile$entity", children: _jsx(_Fragment, { children: _jsx(OakAvatar, { oakAutoUnmount: true, oakPath: oakFullpath
                                            ? oakFullpath + '.extraFile$entity'
                                            : undefined, entity: "user" }) }) }), _jsx(Form.Item, { label: t('user:attr.name'), rules: [
                                    {
                                        required: true,
                                    },
                                ], children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "", onChange: (e) => methods.update({
                                            name: e.target.value,
                                        }), value: name }) }) }), _jsx(Form.Item, { label: t('user:attr.nickname'), rules: [
                                    {
                                        required: true,
                                    },
                                ], children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "", onChange: (e) => methods.update({
                                            nickname: e.target.value,
                                        }), value: nickname }) }) }), _jsx(Form.Item, { label: t('user:attr.gender'), children: _jsx(Space, { direction: "vertical", children: _jsx(Radio.Group, { value: data.gender, options: genderOptions, onChange: ({ target: { value } }) => {
                                            methods.update({ gender: value });
                                        } }) }) }), _jsx(Form.Item, { label: t('user:attr.birth'), children: _jsx(_Fragment, { children: _jsx(DatePicker, { placeholder: "\u8BF7\u9009\u62E9", format: "YYYY-MM-DD", inputReadOnly: true, allowClear: false, value: birth ? dayjs(birth) : undefined, disabledDate: (current) => {
                                            if (dayjs(current).valueOf() >
                                                dayjs().valueOf()) {
                                                return true;
                                            }
                                            return false;
                                        }, onChange: (value) => {
                                            if (value) {
                                                methods.update({
                                                    birth: dayjs(value).valueOf(),
                                                });
                                            }
                                        } }) }) }), _jsx(Form.Item, { wrapperCol: {
                                    xs: { offset: 4 },
                                    md: { offset: 6 },
                                }, children: _jsx(Space, { children: _jsx(Button, { disabled: oakExecuting || !oakDirty, type: "primary", onClick: () => {
                                            updateMyInfo();
                                        }, children: "\u786E\u5B9A" }) }) })] })] }), _jsx("div", { style: { marginTop: '10px' } }), _jsxs("div", { className: Style.container, children: [_jsx(Descriptions, { title: '安全信息' }), _jsxs(Form, { labelCol: { xs: { span: 4 }, md: { span: 6 } }, wrapperCol: { xs: { span: 16 }, md: { span: 12 } }, children: [_jsx(Form.Item, { label: t('mobile'), children: _jsx(_Fragment, { children: _jsxs(Space, { children: [_jsx(Typography, { children: mobile || '未设置' }), _jsx(Button, { size: "small", onClick: () => {
                                                    if (mobile) {
                                                        goAddMobile();
                                                        return;
                                                    }
                                                    setOpen(true);
                                                }, children: mobile ? t('manage') : t('bind') })] }) }) }), _jsx(Form.Item, { label: t('user:attr.password'), children: _jsx(_Fragment, { children: _jsxs(Space, { children: [_jsx(Typography, { children: '********' }), _jsx(Button, { size: "small", onClick: () => {
                                                    goChangePassword();
                                                    return;
                                                }, children: t('manage') })] }) }) }), process.env.NODE_ENV === 'development' && (_jsx(Form.Item, { label: "\u5FAE\u4FE1\u5E10\u53F7", children: _jsx(_Fragment, { children: wechatUser ? (_jsxs(Space, { children: [_jsx(Typography, { children: wechatUser.nickname }), _jsx(WechatUserList, { oakPath: oakFullpath ? `${oakFullpath}.wechatUser$user` : undefined })] })) : (_jsx(Button, { size: "small", onClick: () => {
                                            setOpen2(true);
                                        }, children: "\u7ED1\u5B9A" })) }) }))] })] }), _jsx(Modal, { title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: () => {
                    setOpen(false);
                }, children: _jsx(MobileLogin, { callback: () => {
                        setOpen(false);
                    }, oakPath: "$user/info-mobile/login", oakAutoUnmount: true }) }), _jsx(Modal, { title: "\u7ED1\u5B9A\u5FAE\u4FE1", open: open2, destroyOnClose: true, footer: null, maskClosable: false, onCancel: () => {
                    setOpen2(false);
                }, children: _jsx(WechatLoginQrCode, { oakPath: "$user/info-wechatLogin/qrCode", oakAutoUnmount: true }) }), _jsx(Modal, { title: t('Mobile-Number-Verification'), open: open3, destroyOnClose: true, footer: [
                    _jsx(Button, { onClick: () => setOpen3(false), children: t('cancel') }, "cancel"),
                    _jsx(Button, { type: "primary", disabled: !isCaptcha(captcha), onClick: () => {
                            unbunding(captcha);
                            setOpen3(false);
                        }, children: t('unbind') }, "send")
                ], maskClosable: false, onCancel: () => {
                    setOpen3(false);
                }, children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsxs(Typography, { children: ["\u8BF7\u8F93\u5165", mobile && mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'), "\u6536\u5230\u7684\u9A8C\u8BC1\u7801"] }), _jsx(Form.Item, { name: "captcha", children: _jsx(Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                                // type="number"
                                maxLength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: (e) => {
                                    setCaptcha(e.target.value);
                                }, className: Style['loginbox-input'], suffix: _jsx(Button, { type: "link", disabled: counter > 0, onClick: () => sendCaptcha(), children: counter > 0 ? `${counter}秒后可重发` : t('send') }) }) })] }) })] }));
}
