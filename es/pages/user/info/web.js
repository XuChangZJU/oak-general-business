import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, DatePicker, Popup, Form, Button, Input, Radio, Space, } from 'antd-mobile';
import dayjs from 'dayjs';
import OakAvatar from '../../../components/extraFile/avatar';
import Style from './mobile.module.less';
export default function render(props) {
    const { data, methods } = props;
    const { t, clean, setAvatar, setVisible, goAddMobile, refreshWechatPublicUserInfo, goChangePassword, } = methods;
    const { oakFullpath, visible, nickname, name, birth, gender, mobile, avatarUrl, attr, id, isSupportSyncWeChat, refreshing, } = data;
    return (_jsxs("div", { className: Style.container, children: [_jsxs(List, { className: Style.list, children: [_jsx(List.Item, { extra: _jsx("div", { style: { marginTop: 5, marginBottom: 5 }, children: _jsx(OakAvatar, { oakAutoUnmount: true, oakPath: oakFullpath
                                    ? oakFullpath + '.extraFile$entity'
                                    : undefined, entity: "user", entityId: id }) }), children: "\u5934\u50CF" }), _jsx(List.Item, { extra: nickname ? nickname : '未设置', onClick: () => {
                            setVisible(true, 'nickname');
                        }, children: t('user:attr.nickname') }), _jsx(List.Item, { extra: gender ? t(`user:v.gender.${gender}`) : '未设置', onClick: () => {
                            setVisible(true, 'gender');
                        }, children: t('user:attr.gender') }), _jsx(List.Item, { extra: birth ? dayjs(birth).format('YYYY-MM-DD') : '未设置', onClick: () => {
                            setVisible(true, 'birth');
                        }, children: t('user:attr.birth') }), _jsx(List.Item, { extra: mobile ? mobile : '未设置', onClick: () => {
                            goAddMobile();
                        }, children: t('mobile') }), _jsx(List.Item, { extra: '********', onClick: () => {
                            goChangePassword();
                        }, children: t('password') })] }), _jsx(Popup, { visible: visible, onMaskClick: () => {
                    clean();
                    setVisible(false, attr);
                }, bodyStyle: {
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '20vh',
                }, children: _jsx(AttrUpsert, { data: data, methods: methods }) })] }));
}
function AttrUpsert(props) {
    const { data, methods } = props;
    const { attr, genderOptions, attrs } = data;
    const { setCustomData, onConfirm, setVisible } = methods;
    const label = attrs[attr];
    return (_jsx("div", { children: _jsxs(Form, { footer: _jsx(Button, { block: true, type: "submit", color: "primary", size: "large", onClick: async () => {
                    await onConfirm(attr);
                }, children: "\u63D0\u4EA4" }), children: [_jsx(Form.Header, { children: "\u4FEE\u6539\u4FE1\u606F" }), attr === 'nickname' && (_jsx(Form.Item, { name: attr, label: label, rules: [{ required: true }], children: _jsx(Input, { placeholder: `请输入${label}`, defaultValue: data[attr], onChange: (value) => {
                            setCustomData(attr, value);
                        } }) })), attr === 'gender' && (_jsx(Form.Item, { name: attr, label: label, rules: [{ required: true }], children: _jsx(Radio.Group, { defaultValue: data[attr], onChange: (value) => {
                            setCustomData(attr, value);
                        }, children: _jsx(Space, { direction: "vertical", children: genderOptions.map((ele) => (_jsx(Radio, { value: ele.value, children: ele.label }))) }) }) })), attr === 'birth' && (_jsx(Form.Item, { name: attr, label: label, onClick: (e, datePickerRef) => {
                        datePickerRef.current?.open();
                    }, children: _jsx(DatePicker, { defaultValue: data[attr] ? dayjs(data[attr]).toDate() : null, onConfirm: (value) => {
                            setCustomData(attr, dayjs(value).startOf('day').valueOf());
                        }, max: dayjs().toDate(), children: (value) => value
                            ? dayjs(value).format('YYYY-MM-DD')
                            : '请选择日期' }) }))] }) }));
}
