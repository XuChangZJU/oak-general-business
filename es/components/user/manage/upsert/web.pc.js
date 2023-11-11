import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input, Form, Radio, DatePicker } from 'antd';
import dayjs from 'dayjs';
export default function Render(props) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;
    const { t, update, confirm } = methods;
    return (_jsxs(Form, { layout: "horizontal", labelCol: { span: 8 }, wrapperCol: { span: 16 }, style: { maxWidth: 600 }, children: [_jsx(Form.Item, { label: t('user:attr.nickname'), required: true, children: _jsx(Input, { onChange: (e) => update({ nickname: e.target.value }), value: data.nickname || '' }) }), _jsx(Form.Item, { label: t('user:attr.name'), children: _jsx(Input, { onChange: (e) => update({ name: e.target.value }), value: data.name || '' }) }), _jsx(Form.Item, { label: t('user:attr.birth'), children: _jsx(DatePicker, { value: data.birth ? dayjs(data.birth) : undefined, format: 'YYYY/MM/DD', onChange: (value) => update({ birth: dayjs(value).valueOf() }) }) }), _jsx(Form.Item, { label: t('user:attr.gender'), children: _jsx(Radio.Group, { onChange: (e) => {
                        update({
                            gender: e.target
                                .value,
                        });
                    }, value: data.gender, children: GenderOptions.map((ele, idx) => (_jsx(Radio, { value: ele.value, children: ele.label }, idx))) }) }), _jsx(Form.Item, { label: t('user:attr.idCardType'), children: _jsx(Radio.Group, { onChange: (e) => {
                        update({
                            idCardType: e.target
                                .value,
                        });
                    }, value: data.idCardType, children: IDCardTypeOptions.map((ele, idx) => (_jsx(Radio, { value: ele.value, children: ele.label }, idx))) }) }), _jsx(Form.Item, { label: t('user:attr.idNumber'), children: _jsx(Input, { onChange: (e) => update({ idNumber: e.target.value }), value: data.idNumber || '' }) }), _jsx(Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: _jsx(Button, { type: "primary", color: "primary", onClick: () => confirm(), children: t('common::action.confirm') }) })] }));
}
