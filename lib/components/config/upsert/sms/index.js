"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var lodash_1 = require("oak-domain/lib/utils/lodash");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Ali(props) {
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), open = _a[0], setModal = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), smsIndex = _b[0], setSmsIndex = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), labelType = _c[0], setLabelType = _c[1];
    var sms = props.sms, setValue = props.setValue, addItem = props.addItem, removeItem = props.removeItem, cleanKey = props.cleanKey;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u963F\u91CC\u4E91\u4E91\u77ED\u4FE1\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                // hideAdd={!(sms.length > 0)}
                onEdit: function (targetKey, action) {
                    if (action === 'add') {
                        addItem('', sms.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: sms.length > 0
                    ? sms.map(function (ele, idx) { return ({
                        key: "".concat(idx),
                        label: "\u77ED\u4FE1".concat(idx + 1),
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKeyId", name: "accessKeyId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeyId", type: "text", value: ele.accessKeyId, onChange: function (e) {
                                                return setValue("".concat(idx, ".accessKeyId"), e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "defaultSignName", name: "defaultSignName" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165defaultSignName", type: "text", value: ele.defaultSignName, onChange: function (e) {
                                                return setValue("".concat(idx, ".defaultSignName"), e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "templates", name: "templates" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                                        // hideAdd={!(Object.keys(ele.templates).length > 0)}
                                        onEdit: function (targetKey, action) {
                                            if (action === 'add') {
                                                setSmsIndex("".concat(idx));
                                                setModal(true);
                                            }
                                            else {
                                                cleanKey("".concat(idx, ".templates"), targetKey);
                                            }
                                        }, items: Object.keys(ele.templates || {}).length > 0
                                            ? Object.keys(ele.templates).map(function (name, idx) {
                                                var template = ele.templates[name];
                                                return {
                                                    key: "".concat(name),
                                                    label: "".concat(name),
                                                    children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: {
                                                            marginTop: 10,
                                                        } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "signName", name: "signName" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165signName", type: "text", value: template.signName, onChange: function (e) {
                                                                            return setValue("".concat(idx, ".templateMsgs.").concat(name, ".signName"), e
                                                                                .target
                                                                                .value);
                                                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "code", name: "code" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165code", type: "text", value: template.code, onChange: function (e) {
                                                                            return setValue("".concat(idx, ".templateMsgs.").concat(name, ".code"), e
                                                                                .target
                                                                                .value);
                                                                        } }) }) }))] }))),
                                                };
                                            })
                                            : [] }) }))] }))),
                    }); })
                    : [] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u65B0\u5EFA\u6A21\u7248\u6807\u7B7E", onCancel: function () {
                    setModal(false);
                    setLabelType('');
                }, onOk: function () {
                    if (!labelType) {
                        antd_1.message.error({
                            content: '请输入标签名称',
                        });
                        return;
                    }
                    var templates = (0, lodash_1.get)(sms, "".concat(smsIndex, ".templates")) || {};
                    if (Object.keys(templates).includes(labelType)) {
                        antd_1.message.error({
                            content: '已存在相同的标签名，请重新输入',
                        });
                        return;
                    }
                    setValue("".concat(smsIndex, ".templates.").concat(labelType), {});
                    setModal(false);
                    setLabelType('');
                    setSmsIndex('');
                }, open: open, cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", destroyOnClose: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6807\u7B7E\u540D\u79F0", name: "messageType", help: "\u53EA\u80FD\u8F93\u5165\u82F1\u6587\u548C\u4E2D\u6587" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", type: "text", value: labelType, onChange: function (e) {
                                    return setLabelType(e.target.value.replace(/[0-9-.]/g, ''));
                                } }) }) })) })) }))] })));
}
function Tencent(props) {
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), open = _a[0], setModal = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), smsIndex = _b[0], setSmsIndex = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), labelType = _c[0], setLabelType = _c[1];
    var sms = props.sms, setValue = props.setValue, addItem = props.addItem, removeItem = props.removeItem, cleanKey = props.cleanKey;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u817E\u8BAF\u4E91\u77ED\u4FE1\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                // hideAdd={!(sms.length > 0)}
                onEdit: function (targetKey, action) {
                    if (action === 'add') {
                        addItem('', sms.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: sms.length > 0
                    ? sms.map(function (ele, idx) { return ({
                        key: "".concat(idx),
                        label: "\u77ED\u4FE1".concat(idx + 1),
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "smsSdkAppId", name: "smsSdkAppId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165smsSdkAppId", type: "text", value: ele.smsSdkAppId, onChange: function (e) {
                                                return setValue("".concat(idx, ".smsSdkAppId"), e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "defaultSignName", name: "defaultSignName" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165defaultSignName", type: "text", value: ele.defaultSignName, onChange: function (e) {
                                                return setValue("".concat(idx, ".defaultSignName"), e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "templates", name: "templates" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                                        // hideAdd={!(Object.keys(ele.templates).length > 0)}
                                        onEdit: function (targetKey, action) {
                                            if (action === 'add') {
                                                setSmsIndex("".concat(idx));
                                                setModal(true);
                                            }
                                            else {
                                                cleanKey("".concat(idx, ".templates"), targetKey);
                                            }
                                        }, items: Object.keys(ele.templates || {}).length > 0
                                            ? Object.keys(ele.templates).map(function (name, idx) {
                                                var template = ele.templates[name];
                                                return {
                                                    key: "".concat(name),
                                                    label: "".concat(name),
                                                    children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: {
                                                            marginTop: 10,
                                                        } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "signName", name: "signName" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165signName", type: "text", value: template.signName, onChange: function (e) {
                                                                            return setValue("".concat(idx, ".templateMsgs.").concat(name, ".signName"), e
                                                                                .target
                                                                                .value);
                                                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "code", name: "code" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165code", type: "text", value: template.code, onChange: function (e) {
                                                                            return setValue("".concat(idx, ".templateMsgs.").concat(name, ".code"), e
                                                                                .target
                                                                                .value);
                                                                        } }) }) }))] }))),
                                                };
                                            })
                                            : [] }) }))] }))),
                    }); })
                    : [] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u65B0\u5EFA\u6A21\u7248\u6807\u7B7E", onCancel: function () {
                    setModal(false);
                    setLabelType('');
                }, onOk: function () {
                    if (!labelType) {
                        antd_1.message.error({
                            content: '请输入标签名称',
                        });
                        return;
                    }
                    var templates = (0, lodash_1.get)(sms, "".concat(smsIndex, ".templates")) || {};
                    if (Object.keys(templates).includes(labelType)) {
                        antd_1.message.error({
                            content: '已存在相同的标签名，请重新输入',
                        });
                        return;
                    }
                    setValue("".concat(smsIndex, ".templates.").concat(labelType), {});
                    setModal(false);
                    setLabelType('');
                    setSmsIndex('');
                }, open: open, cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", destroyOnClose: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6807\u7B7E\u540D\u79F0", name: "messageType", help: "\u53EA\u80FD\u8F93\u5165\u82F1\u6587\u548C\u4E2D\u6587" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", type: "text", value: labelType, onChange: function (e) {
                                    return setLabelType(e.target.value.replace(/[0-9-.]/g, ''));
                                } }) }) })) })) }))] })));
}
function Sms(props) {
    var sms = props.sms, setValue = props.setValue, removeItem = props.removeItem, cleanKey = props.cleanKey;
    var ali = sms.ali, tencent = sms.tencent;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: "middle", style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ className: web_module_less_1.default.tips }, { children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" })) }), (0, jsx_runtime_1.jsx)(Tencent, { sms: tencent || [], setValue: function (path, value) { return setValue("tencent.".concat(path), value); }, removeItem: function (path, index) { return removeItem("tencent", index); }, addItem: function (path, index) { return setValue("tencent.".concat(index), {}); }, cleanKey: function (path, key) { return cleanKey("tencent.".concat(path), key); } }), (0, jsx_runtime_1.jsx)(Ali, { sms: ali || [], setValue: function (path, value) { return setValue("ali.".concat(path), value); }, removeItem: function (path, index) { return removeItem("ali", index); }, addItem: function (path, index) { return setValue("ali.".concat(index), {}); }, cleanKey: function (path, key) { return cleanKey("ali.".concat(path), key); } })] })));
}
exports.default = Sms;
