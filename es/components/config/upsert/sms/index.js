import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, Row, Col, Card, Divider, Input, Form, Space, Modal, message, Switch, } from 'antd';
import { get } from 'oak-domain/lib/utils/lodash';
import Styles from './web.module.less';
function Ali(props) {
    const [open, setModal] = useState(false);
    const [smsIndex, setSmsIndex] = useState('');
    const [labelType, setLabelType] = useState('');
    const { sms, setValue, addItem, removeItem, cleanKey } = props;
    return (_jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u963F\u91CC\u4E91\u4E91\u77ED\u4FE1\u914D\u7F6E" }), _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                // hideAdd={!(sms.length > 0)}
                onEdit: (targetKey, action) => {
                    if (action === 'add') {
                        addItem('', sms.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: sms.length > 0
                    ? sms.map((ele, idx) => ({
                        key: `${idx}`,
                        label: `短信${idx + 1}`,
                        children: (_jsxs(Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "accessKeyId", name: "accessKeyId", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165accessKeyId", type: "text", value: ele.accessKeyId, onChange: (e) => setValue(`${idx}.accessKeyId`, e.target.value) }) }) }), _jsx(Form.Item, { label: "defaultSignName", name: "defaultSignName", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165defaultSignName", type: "text", value: ele.defaultSignName, onChange: (e) => setValue(`${idx}.defaultSignName`, e.target.value) }) }) }), _jsx(Form.Item, { label: "templates", name: "templates", children: _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                                        // hideAdd={!(Object.keys(ele.templates).length > 0)}
                                        onEdit: (targetKey, action) => {
                                            if (action === 'add') {
                                                setSmsIndex(`${idx}`);
                                                setModal(true);
                                            }
                                            else {
                                                cleanKey(`${idx}.templates`, targetKey);
                                            }
                                        }, items: Object.keys(ele.templates || {}).length > 0
                                            ? Object.keys(ele.templates).map((name, idx) => {
                                                const template = ele.templates[name];
                                                return {
                                                    key: `${name}`,
                                                    label: `${name}`,
                                                    children: (_jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: {
                                                            marginTop: 10,
                                                        }, children: [_jsx(Form.Item, { label: "signName", name: "signName", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165signName", type: "text", value: template.signName, onChange: (e) => setValue(`${idx}.templates.${name}.signName`, e
                                                                            .target
                                                                            .value) }) }) }), _jsx(Form.Item, { label: "code", name: "code", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165code", type: "text", value: template.code, onChange: (e) => setValue(`${idx}.templates.${name}.code`, e
                                                                            .target
                                                                            .value) }) }) })] })),
                                                };
                                            })
                                            : [] }) })] })),
                    }))
                    : [] }), _jsx(Modal, { title: "\u65B0\u5EFA\u6A21\u7248\u6807\u7B7E", onCancel: () => {
                    setModal(false);
                    setLabelType('');
                }, onOk: () => {
                    if (!labelType) {
                        message.error({
                            content: '请输入标签名称',
                        });
                        return;
                    }
                    const templates = get(sms, `${smsIndex}.templates`) || {};
                    if (Object.keys(templates).includes(labelType)) {
                        message.error({
                            content: '已存在相同的标签名，请重新输入',
                        });
                        return;
                    }
                    setValue(`${smsIndex}.templates.${labelType}`, {});
                    setModal(false);
                    setLabelType('');
                    setSmsIndex('');
                }, open: open, cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", destroyOnClose: true, children: _jsx(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: _jsx(Form.Item, { label: "\u6807\u7B7E\u540D\u79F0", 
                        //name="messageType"
                        help: "\u53EA\u80FD\u8F93\u5165\u82F1\u6587\u548C\u4E2D\u6587", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", type: "text", value: labelType, onChange: (e) => setLabelType(e.target.value.replace(/[0-9-.]/g, '')) }) }) }) }) })] }));
}
function Tencent(props) {
    const [open, setModal] = useState(false);
    const [smsIndex, setSmsIndex] = useState('');
    const [labelType, setLabelType] = useState('');
    const { sms, setValue, addItem, removeItem, cleanKey } = props;
    return (_jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u817E\u8BAF\u4E91\u77ED\u4FE1\u914D\u7F6E" }), _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                // hideAdd={!(sms.length > 0)}
                onEdit: (targetKey, action) => {
                    if (action === 'add') {
                        addItem('', sms.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: sms.length > 0
                    ? sms.map((ele, idx) => ({
                        key: `${idx}`,
                        label: `短信${idx + 1}`,
                        children: (_jsxs(Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "secretId", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165secretId", type: "text", value: ele.secretId, onChange: (e) => setValue(`${idx}.secretId`, e.target.value) }) }) }), _jsx(Form.Item, { label: "smsSdkAppId", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165smsSdkAppId", type: "text", value: ele.smsSdkAppId, onChange: (e) => setValue(`${idx}.smsSdkAppId`, e.target.value) }) }) }), _jsx(Form.Item, { label: "defaultSignName", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165defaultSignName", type: "text", value: ele.defaultSignName, onChange: (e) => setValue(`${idx}.defaultSignName`, e.target.value) }) }) }), _jsx(Form.Item, { label: "templates", children: _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                                        // hideAdd={!(Object.keys(ele.templates).length > 0)}
                                        onEdit: (targetKey, action) => {
                                            if (action === 'add') {
                                                setSmsIndex(`${idx}`);
                                                setModal(true);
                                            }
                                            else {
                                                cleanKey(`${idx}.templates`, targetKey);
                                            }
                                        }, items: Object.keys(ele.templates || {}).length > 0
                                            ? Object.keys(ele.templates).map((name, idx) => {
                                                const template = ele.templates[name];
                                                return {
                                                    key: `${name}`,
                                                    label: `${name}`,
                                                    children: (_jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: {
                                                            marginTop: 10,
                                                        }, children: [_jsx(Form.Item, { label: "signName", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165signName", type: "text", value: template.signName, onChange: (e) => setValue(`${idx}.templates.${name}.signName`, e
                                                                            .target
                                                                            .value) }) }) }), _jsx(Form.Item, { label: "code", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165code", type: "text", value: template.code, onChange: (e) => setValue(`${idx}.templates.${name}.code`, e
                                                                            .target
                                                                            .value) }) }) })] })),
                                                };
                                            })
                                            : [] }) })] })),
                    }))
                    : [] }), _jsx(Modal, { title: "\u65B0\u5EFA\u6A21\u7248\u6807\u7B7E", onCancel: () => {
                    setModal(false);
                    setLabelType('');
                }, onOk: () => {
                    if (!labelType) {
                        message.error({
                            content: '请输入标签名称',
                        });
                        return;
                    }
                    const templates = get(sms, `${smsIndex}.templates`) || {};
                    if (Object.keys(templates).includes(labelType)) {
                        message.error({
                            content: '已存在相同的标签名，请重新输入',
                        });
                        return;
                    }
                    setValue(`${smsIndex}.templates.${labelType}`, {});
                    setModal(false);
                    setLabelType('');
                    setSmsIndex('');
                }, open: open, cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", destroyOnClose: true, children: _jsx(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: _jsx(Form.Item, { label: "\u6807\u7B7E\u540D\u79F0", 
                        //name="messageType"
                        help: "\u53EA\u80FD\u8F93\u5165\u82F1\u6587\u548C\u4E2D\u6587", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", type: "text", value: labelType, onChange: (e) => setLabelType(e.target.value.replace(/[0-9-.]/g, '')) }) }) }) }) })] }));
}
export default function Sms(props) {
    const { sms, setValue, removeItem, cleanKey } = props;
    const { ali, tencent, mockSend } = sms;
    return (_jsxs(Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [_jsx(Row, { children: _jsx(Card, { className: Styles.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), _jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u77ED\u4FE1\u914D\u7F6E" }), _jsx(Form, { children: _jsx(Form.Item, { label: "\u6A21\u62DF\u53D1\u9001", 
                            //name="mockSend"
                            tooltip: "\u5F00\u542F\u6A21\u62DF\u53D1\u9001\u77ED\u4FE1\uFF0C\u53D1\u77ED\u4FE1\u4E0D\u4F1A\u8C03\u7528api", children: _jsx(_Fragment, { children: _jsx(Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: mockSend, onChange: (checked) => setValue(`mockSend`, checked) }) }) }) })] }), _jsx(Tencent, { sms: tencent || [], setValue: (path, value) => setValue(`tencent.${path}`, value), removeItem: (path, index) => removeItem(`tencent`, index), addItem: (path, index) => setValue(`tencent.${index}`, {}), cleanKey: (path, key) => cleanKey(`tencent.${path}`, key) }), _jsx(Ali, { sms: ali || [], setValue: (path, value) => setValue(`ali.${path}`, value), removeItem: (path, index) => removeItem(`ali`, index), addItem: (path, index) => setValue(`ali.${index}`, {}), cleanKey: (path, key) => cleanKey(`ali.${path}`, key) })] }));
}
