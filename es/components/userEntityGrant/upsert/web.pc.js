import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Space, Button, InputNumber, Typography, } from 'antd';
import UserEntityGrantShare from '../share';
import Style from './web.module.less';
export default function Render(props) {
    const { oakId, oakFullpath, entity, entityId, relationEntity, showBack = true, userEntityGrantId, period } = props.data;
    const { setPeriod, confirm, setInit } = props.methods;
    console.log(userEntityGrantId);
    if (!!userEntityGrantId) {
        return (_jsxs("div", { className: Style.container, children: [_jsx(UserEntityGrantShare, { oakId: userEntityGrantId, oakAutoUnmount: true, oakPath: "$userEntityGrant/upsert-userEntityGrant/detail" }), _jsx("div", { style: {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }, children: _jsx(Button, { type: "primary", onClick: () => {
                            setInit();
                        }, children: "\u91CD\u65B0\u751F\u6210" }) })] }));
    }
    return (_jsx("div", { className: Style.container, children: _jsxs(Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [_jsx(Form.Item, { label: "\u6709\u6548\u671F", required: true, children: _jsx(_Fragment, { children: _jsx(InputNumber, { min: 1, max: 30, placeholder: "\u8BF7\u8F93\u5165", onChange: (value) => {
                                setPeriod(value);
                            }, value: period, addonAfter: _jsx(Typography, { children: "\u5929" }) }) }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                                confirm();
                            }, children: "\u63D0\u4EA4" }) }) })] }) }));
}
