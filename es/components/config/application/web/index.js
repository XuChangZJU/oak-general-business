import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Card, Divider, Input, Form, Space, Select, Switch, message, } from 'antd';
import Styles from './web.module.less';
export default function Web(props) {
    const { config, setValue } = props;
    const [messageApi] = message.useMessage();
    return (_jsxs(Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [_jsx(Row, { children: _jsx(Card, { className: Styles.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), _jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u7F51\u7AD9-\u5FAE\u4FE1\u626B\u7801" }), _jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "appId", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: config?.wechat?.appId, onChange: (e) => setValue(`wechat.appId`, e.target.value) }) }) }), _jsx(Form.Item, { label: "appSecret", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: config?.wechat?.appSecret, onChange: (e) => setValue(`wechat.appSecret`, e.target.value) }) }) }), _jsx(Form.Item, { label: "\u6388\u6743\u56DE\u8C03\u57DF", 
                                //name="domain"
                                tooltip: "\u6388\u6743\u56DE\u8C03\u57DF\u53EF\u9009\u586B\uFF0C\u672A\u586B\u5199\u7684\u8BDD\uFF0C\u4F7F\u7528\u7F51\u9875\u8BBF\u95EE\u7684\u57DF\u540D\u5F53\u4F5C\u6388\u6743\u56DE\u8C03\u57DF", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6388\u6743\u56DE\u8C03\u57DF", type: "text", value: config?.wechat?.domain, onChange: (e) => setValue(`wechat.domain`, e.target.value) }) }) }), _jsx(Form.Item, { label: "\u5FAE\u4FE1\u7F51\u7AD9\u5E94\u7528\u6388\u6743\u767B\u5F55", 
                                // name="enable"
                                tooltip: "\u5F00\u542F\u540E\uFF0C\u767B\u5F55\u9875\u663E\u793A\u5FAE\u4FE1\u626B\u7801\u5165\u53E3\uFF0C\u5FAE\u4FE1\u626B\u7801\u540E\u4F7F\u7528\u5FAE\u4FE1\u7F51\u7AD9\u5E94\u7528\u6388\u6743\u767B\u5F55", help: "\u5F00\u542F\u5F53\u524D\u767B\u5F55\u65B9\u5F0F\u65F6\uFF0C\u5C06\u540C\u65F6\u5173\u95ED\u5FAE\u4FE1\u516C\u4F17\u53F7\u626B\u7801\u767B\u5F55", children: _jsx(_Fragment, { children: _jsx(Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: config?.wechat?.enable, onChange: (checked) => setValue(`wechat.enable`, checked) }) }) })] })] }), _jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u7F51\u7AD9-\u6388\u6743\u65B9\u5F0F" }), _jsx(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: _jsx(Form.Item, { label: "passport", children: _jsx(_Fragment, { children: _jsx(Select, { mode: "multiple", allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u6388\u6743\u65B9\u5F0F", value: config?.passport, onChange: (value) => {
                                        if (value.includes('wechat') && value.includes('wechatPublic')) {
                                            message.warning('微信网站和微信公众号中，只能选择一个');
                                            return;
                                        }
                                        setValue(`passport`, value);
                                    }, options: [
                                        {
                                            label: '邮箱',
                                            value: 'email',
                                        },
                                        {
                                            label: '手机号',
                                            value: 'mobile',
                                        },
                                        {
                                            label: '微信网站',
                                            value: 'wechat',
                                        },
                                        {
                                            label: '微信公众号',
                                            value: 'wechatPublic',
                                        },
                                    ] }) }) }) })] })] }));
}
