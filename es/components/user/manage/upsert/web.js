import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Input, Form, Radio, DatePicker, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import Style from './mobile.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;
    const { t, update, setDisablePulldownRefresh, confirm } = methods;
    const [birthPickerVisible, setBirthPickerVisible] = useState(false);
    return (_jsxs("div", { className: Style.container, children: [_jsxs(Form, { layout: "horizontal", children: [_jsx(Form.Item, { label: t('user:attr.nickname'), rules: [{ required: true }], children: _jsx(Input, { onChange: (val) => update({ nickname: val }), value: data.nickname || '' }) }), _jsx(Form.Item, { label: t('user:attr.name'), children: _jsx(Input, { onChange: (val) => update({ name: val }), value: data.name || '' }) }), _jsx(Form.Item, { label: t('user:attr.birth'), onClick: () => {
                            setBirthPickerVisible(true);
                            setDisablePulldownRefresh(true);
                        }, children: _jsx(Input, { value: data.birth
                                ? dayjs(data.birth).format('YYYY-MM-DD')
                                : '', readOnly: true }) }), _jsx(Form.Item, { label: t('user:attr.gender'), children: _jsx(Radio.Group, { onChange: (e) => {
                                update({
                                    gender: e,
                                });
                            }, value: data.gender, children: _jsx(Space, { direction: "horizontal", children: GenderOptions.map((ele, idx) => (_jsx(Radio, { value: ele.value, className: Style.radio, children: ele.label }, idx))) }) }) }), _jsx(Form.Item, { label: t('user:attr.idCardType'), children: _jsx(Radio.Group, { onChange: (e) => {
                                update({
                                    idCardType: e,
                                });
                            }, value: data.idCardType, children: _jsx(Space, { direction: "vertical", children: IDCardTypeOptions.map((ele, idx) => (_jsx(Radio, { value: ele.value, className: Style.radio, children: ele.label }, idx))) }) }) }), _jsx(Form.Item, { label: t('user:attr.idNumber'), children: _jsx(Input, { onChange: (val) => update({ idNumber: val }), value: data.idNumber || '' }) })] }), _jsx(DatePicker, { visible: birthPickerVisible, max: new Date(), min: new Date('1900-01-01'), onConfirm: (value) => {
                    const val = value.valueOf();
                    update({ birth: val });
                }, onClose: () => {
                    setBirthPickerVisible(false);
                    setDisablePulldownRefresh(false);
                } }), _jsx("div", { style: { flex: 1 } }), _jsx(Button, { block: true, color: "primary", onClick: () => confirm(), children: t('common::action.confirm') })] }));
}
