import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Space, Form, Input } from 'antd';
import Style from './web.module.less';
export default function Render(props) {
    const { getMenuContent, changeOpen } = props.data;
    const { setMessage } = props.methods;
    const [appid, setAppid] = useState('');
    const [url, setUrl] = useState('');
    const [pagepath, setPagepath] = useState('');
    return (_jsxs("div", { className: Style.container, children: [_jsx(Form.Item, { required: true, label: 'appid', labelAlign: 'right', labelCol: { span: 6 }, children: _jsx(Input, { placeholder: '\u5C0F\u7A0B\u5E8F\u7684appid', onChange: (val) => {
                        setAppid(val.target.value);
                    }, value: appid }) }), _jsx(Form.Item, { required: true, label: 'url', labelAlign: 'right', labelCol: { span: 6 }, children: _jsx(Input, { placeholder: '\u5C0F\u7A0B\u5E8F\u7684\u7F51\u9875\u94FE\u63A5', onChange: (val) => {
                        setUrl(val.target.value);
                    }, value: url }) }), _jsx(Form.Item, { required: true, label: 'pagepath', labelAlign: 'right', labelCol: { span: 6 }, children: _jsx(Input, { placeholder: '\u5C0F\u7A0B\u5E8F\u7684\u9875\u9762\u8DEF\u5F84', onChange: (val) => {
                        setPagepath(val.target.value);
                    }, value: pagepath }) }), _jsxs(Space, { style: { display: 'flex', justifyContent: 'center' }, children: [_jsx(Button, { type: 'primary', onClick: () => {
                            if (!appid) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入小程序appid'
                                });
                                return;
                            }
                            if (!url) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入小程序网页链接'
                                });
                                return;
                            }
                            if (!pagepath) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入小程序页面路径'
                                });
                                return;
                            }
                            getMenuContent({ appid, url, pagepath });
                            setAppid('');
                            setPagepath('');
                            setUrl('');
                            changeOpen(false);
                        }, children: "\u786E\u5B9A" }), _jsx(Button, { onClick: () => {
                            changeOpen(false);
                        }, children: "\u53D6\u6D88" })] })] }));
}
