import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Select } from 'antd';
export default function Render(props) {
    const { update, data } = props;
    return (_jsxs(Form, { colon: true, labelCol: { span: 6 }, wrapperCol: { span: 16 }, children: [_jsx(Form.Item, { label: "\u8BBF\u95EE\u57DF\u540D", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8F93\u5165\u57DF\u540D\uFF0C\u4F8B\u5982\uFF1Awww.abc.com", onChange: (e) => {
                            update('url', e.target.value);
                        }, value: data.url }) }) }), _jsx(Form.Item, { label: "\u8BF7\u6C42\u8DEF\u5F84", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                            update('apiPath', e.target.value);
                        }, value: data.apiPath }) }) }), _jsx(Form.Item, { label: "\u7AEF\u53E3", required: true, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                            const v = e.target.value;
                            update('port', v ? Number(v) : undefined);
                        }, value: data.port }) }) }), _jsx(Form.Item
            //name="protocol"
            , { 
                //name="protocol"
                required: true, label: "\u534F\u8BAE", children: _jsx(_Fragment, { children: _jsx(Select
                    // mode="multiple"
                    , { 
                        // mode="multiple"
                        allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u534F\u8BAE", value: data.protocol, onChange: (value) => {
                            update('protocol', value);
                        }, options: [
                            {
                                label: 'http',
                                value: 'http',
                            },
                            {
                                label: 'https',
                                value: 'https',
                            },
                        ] }) }) })] }));
}
