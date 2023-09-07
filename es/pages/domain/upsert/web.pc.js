import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Row, Col, Input, Space, Select } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';
export default function Render(props) {
    const { systemId, url, apiPath, port, protocol, variant, showBack = true, } = props.data;
    const { t, update, navigateBack, confirm } = props.methods;
    return (_jsx(Container, { variant: variant, showBack: showBack, children: _jsx(Row, { children: _jsx(Col, { xs: 24, sm: 12, children: _jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u8BBF\u95EE\u57DF\u540D", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8F93\u5165\u57DF\u540D\uFF0C\u4F8B\u5982\uFF1Awww.abc.com", onChange: (e) => {
                                        update({
                                            url: e.target.value,
                                        });
                                    }, value: url }) }) }), _jsx(Form.Item, { label: "\u8BF7\u6C42\u8DEF\u5F84", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                        update({
                                            apiPath: e.target.value,
                                        });
                                    }, value: apiPath }) }) }), _jsx(Form.Item, { label: "\u7AEF\u53E3", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                                        const v = e.target.value;
                                        update({
                                            port: v ? Number(v) : undefined,
                                        });
                                    }, value: port }) }) }), _jsx(Form.Item
                        //name="protocol"
                        , { 
                            //name="protocol"
                            required: true, label: "\u534F\u8BAE", children: _jsx(_Fragment, { children: _jsx(Select
                                // mode="multiple"
                                , { 
                                    // mode="multiple"
                                    allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u534F\u8BAE", value: protocol, onChange: (value) => {
                                        update({
                                            protocol: value,
                                        });
                                    }, options: [
                                        {
                                            label: 'http',
                                            value: 'http',
                                        },
                                        {
                                            label: 'https',
                                            value: 'https',
                                        },
                                    ] }) }) }), _jsx(Action, { variant: variant, children: _jsx(Form.Item, { wrapperCol: { offset: 6 }, children: _jsxs(Space, { children: [_jsx(Button, { type: "primary", onClick: () => {
                                                confirm();
                                            }, children: "\u786E\u5B9A" }), _jsx(Button, { onClick: () => {
                                                navigateBack();
                                            }, children: "\u8FD4\u56DE" })] }) }) })] }) }) }) }));
}
function Action(props) {
    const { children, variant } = props;
    if (variant === 'dialog') {
        return null;
    }
    return (_jsx(_Fragment, { children: children }));
}
function Container(props) {
    const { children, variant, showBack } = props;
    if (variant === 'inline' || variant === 'dialog') {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx(PageHeader, { showBack: showBack, title: "\u7CFB\u7EDF\u7F16\u8F91", children: _jsx("div", { className: Style.container, children: children }) }));
}
