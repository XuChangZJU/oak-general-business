import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Space, Button, InputNumber, Typography, } from 'antd';
import Style from './web.module.less';
import BridgeDetail from '../detail';
export default function Render(props) {
    const { methods, data } = props;
    const { entity, entityId, relation, period, bridgeId, oakFullpath, } = props.data;
    const { setPeriod, confirm, setInit } = methods;
    if (!!bridgeId) {
        return (_jsxs("div", { className: Style.container, children: [_jsx(BridgeDetail, { oakId: bridgeId, oakAutoUnmount: true, oakPath: oakFullpath
                        ? `${oakFullpath}`
                        : undefined }), _jsx("div", { style: {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }, children: _jsx(Button, { type: "primary", onClick: () => {
                            setInit();
                        }, children: "\u91CD\u65B0\u751F\u6210" }) })] }));
    }
    return (_jsx(_Fragment, { children: _jsx("div", { className: Style.container, children: _jsxs(Form, { labelCol: { span: 4 }, wrapperCol: { span: 8 }, children: [_jsx(Form.Item, { label: "\u6709\u6548\u671F", required: true, children: _jsx(_Fragment, { children: _jsx(InputNumber, { min: 1, max: 30, placeholder: "\u8BF7\u8F93\u5165", onChange: (value) => {
                                    setPeriod(value);
                                }, value: period, addonAfter: _jsx(Typography, { children: "\u5929" }) }) }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                                    confirm();
                                }, children: "\u63D0\u4EA4" }) }) })] }) }) }));
}
