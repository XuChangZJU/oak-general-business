import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card, Divider, Input, Form, Space, Select, } from 'antd';
import Styles from './web.module.less';
export default function WechatMp(props) {
    const { config, setValue } = props;
    return (_jsxs(Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [_jsx(Row, { children: _jsx(Card, { className: Styles.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), _jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F-\u57FA\u7840" }), _jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "appId", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: config?.appId, onChange: (e) => setValue(`appId`, e.target.value) }) }) }), _jsx(Form.Item, { label: "appSecret", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: config?.appSecret, onChange: (e) => setValue(`appSecret`, e.target.value) }) }) }), _jsx(Form.Item, { label: "\u539F\u59CBID", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u539F\u59CBID", type: "text", value: config?.originalId, onChange: (e) => setValue(`originalId`, e.target.value) }) }) }), _jsx(Form.Item, { label: "qrCodePrefix", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165qrCodePrefix", type: "text", value: config?.qrCodePrefix, onChange: (e) => setValue(`qrCodePrefix`, e.target.value) }) }) })] })] }), _jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F-\u670D\u52A1\u5668\u914D\u7F6E" }), _jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "\u670D\u52A1\u5668\u5730\u5740(URL)", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740(URL)\uFF0C\u9009\u586B", type: "text", value: config?.server?.url, onChange: (e) => setValue(`server.url`, e.target.value) }) }) }), _jsx(Form.Item, { label: "\u4EE4\u724C(Token)", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u4EE4\u724C(Token)", type: "text", value: config?.server?.token, onChange: (e) => setValue(`server.token`, e.target.value) }) }) }), _jsx(Form.Item, { label: "\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5(EncodingAESKey)", 
                                // name="encodingAESKey"
                                tooltip: "\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5\u5C06\u7528\u4E8E\u6D88\u606F\u4F53\u52A0\u89E3\u5BC6\u8FC7\u7A0B\u3002\u5177\u4F53\u529F\u80FD\u8BF7\u53C2\u89C1\u5FAE\u4FE1\u6587\u6863", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5(EncodingAESKey)", type: "text", value: config?.server?.encodingAESKey, onChange: (e) => setValue(`server.encodingAESKey`, e.target.value) }) }) }), _jsx(Form.Item, { label: "\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", children: _jsx(_Fragment, { children: _jsx(Select, { placeholder: "\u8BF7\u9009\u62E9\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", value: config?.server?.mode, onChange: (value) => setValue(`server.mode`, value), options: [
                                            {
                                                value: 'clear',
                                                label: '明文模式',
                                            },
                                            {
                                                value: 'compatible',
                                                label: '兼容模式',
                                            },
                                            {
                                                value: 'safe',
                                                label: '安全模式',
                                            },
                                        ] }) }) }), _jsx(Form.Item, { label: "\u6570\u636E\u683C\u5F0F", children: _jsx(_Fragment, { children: _jsx(Select, { placeholder: "\u8BF7\u9009\u62E9\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", value: config?.server?.dataFormat, onChange: (value) => setValue(`server.dataFormat`, value), options: [
                                            {
                                                value: 'json',
                                                label: 'JSON',
                                            },
                                            {
                                                value: 'xml',
                                                label: 'XML',
                                            },
                                        ] }) }) })] })] })] }));
}
