import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Space, Button, InputNumber, Typography, AutoComplete, } from 'antd';
import ParasiteDetail from '../detail';
export default function Render(props) {
    const { methods, data } = props;
    const { entity, entityId, relation, period, parasiteId, options, nameLabel, nameRequired, } = props.data;
    const { setPeriod, confirm, setInit, onSelect, onSearch, setSearchValue } = methods;
    if (!!parasiteId) {
        return (_jsxs(_Fragment, { children: [_jsx(ParasiteDetail, { oakId: parasiteId, oakAutoUnmount: true, oakPath: "$parasite/upsert-parasite/detail" }), _jsx("div", { style: {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }, children: _jsx(Button, { type: "primary", onClick: () => {
                            setInit();
                        }, children: "\u91CD\u65B0\u751F\u6210" }) })] }));
    }
    return (_jsx(_Fragment, { children: _jsxs(Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [_jsx(Form.Item, { label: nameLabel || '名称', required: nameRequired, children: _jsx(_Fragment, { children: _jsx(AutoComplete, { options: options, style: { width: 200 }, onSelect: onSelect, onSearch: (text) => onSearch(text), placeholder: "\u8BF7\u8F93\u5165", onChange: (value) => {
                                setSearchValue(value);
                            } }) }) }), _jsx(Form.Item, { label: "\u6709\u6548\u671F", required: true, children: _jsx(_Fragment, { children: _jsx(InputNumber, { min: 1, max: 30, placeholder: "\u8BF7\u8F93\u5165", onChange: (value) => {
                                setPeriod(value);
                            }, value: period, addonAfter: _jsx(Typography, { children: "\u5929" }) }) }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                                confirm();
                            }, children: "\u63D0\u4EA4" }) }) })] }) }));
}
