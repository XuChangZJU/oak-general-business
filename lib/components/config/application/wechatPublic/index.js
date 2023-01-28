"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function WechatPublic(props) {
    var _a, _b, _c, _d;
    var _e = tslib_1.__read((0, react_1.useState)(false), 2), open = _e[0], setModal = _e[1];
    var _f = tslib_1.__read((0, react_1.useState)(''), 2), messageType = _f[0], setMessageType = _f[1];
    var config = props.config, setValue = props.setValue, cleanKey = props.cleanKey, removeItem = props.removeItem, _g = props.isService, isService = _g === void 0 ? true : _g;
    var templateMsgs = (config === null || config === void 0 ? void 0 : config.templateMsgs) || {};
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: "middle", style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ className: web_module_less_1.default.tips }, { children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" })) }), (0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u5FAE\u4FE1\u516C\u4F17\u53F7-\u57FA\u7840" })), (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "appId", name: "appId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appId", type: "text", value: config === null || config === void 0 ? void 0 : config.appId, onChange: function (e) {
                                            return setValue("appId", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "appSecret", name: "appSecret" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165appSecret", type: "text", value: config === null || config === void 0 ? void 0 : config.appSecret, onChange: function (e) {
                                            return setValue("appSecret", e.target.value);
                                        } }) }) })), isService && ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u662F\u5426\u4E3A\u670D\u52A1\u53F7", name: "isService" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Switch, { checkedChildren: "\u662F", unCheckedChildren: "\u5426", checked: config === null || config === void 0 ? void 0 : config.isService, onChange: function (checked) {
                                            return setValue("isService", checked);
                                        } }) }) })))] }))] })), isService && ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u5FAE\u4FE1\u516C\u4F17\u53F7-\u670D\u52A1\u5668\u914D\u7F6E" })), (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u670D\u52A1\u5668\u5730\u5740(URL)", name: "url" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740(URL)\uFF0C\u9009\u586B", type: "text", value: (_a = config === null || config === void 0 ? void 0 : config.server) === null || _a === void 0 ? void 0 : _a.url, onChange: function (e) {
                                            return setValue("server.url", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u4EE4\u724C(Token)", name: "token" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u4EE4\u724C(Token)", type: "text", value: (_b = config === null || config === void 0 ? void 0 : config.server) === null || _b === void 0 ? void 0 : _b.token, onChange: function (e) {
                                            return setValue("server.token", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5(EncodingAESKey)", name: "encodingAESKey", tooltip: "\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5\u5C06\u7528\u4E8E\u6D88\u606F\u4F53\u52A0\u89E3\u5BC6\u8FC7\u7A0B\u3002\u5177\u4F53\u529F\u80FD\u8BF7\u53C2\u89C1\u5FAE\u4FE1\u6587\u6863" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6D88\u606F\u52A0\u89E3\u5BC6\u5BC6\u94A5(EncodingAESKey)", type: "text", value: (_c = config === null || config === void 0 ? void 0 : config.server) === null || _c === void 0 ? void 0 : _c.encodingAESKey, onChange: function (e) {
                                            return setValue("server.encodingAESKey", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", name: "mode" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: "\u8BF7\u9009\u62E9\u6D88\u606F\u52A0\u89E3\u5BC6\u65B9\u5F0F", value: (_d = config === null || config === void 0 ? void 0 : config.server) === null || _d === void 0 ? void 0 : _d.mode, onChange: function (value) {
                                            return setValue("server.mode", value);
                                        }, options: [
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
                                        ] }) }) }))] }))] }))), isService && ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u5FAE\u4FE1\u516C\u4F17\u53F7-\u6A21\u7248" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                        // hideAdd={!(Object.keys(templateMsgs).length > 0)}
                        onEdit: function (targetKey, action) {
                            if (action === 'add') {
                                setModal(true);
                            }
                            else {
                                cleanKey("templateMsgs", targetKey);
                            }
                        }, items: Object.keys(templateMsgs).length > 0
                            ? Object.keys(templateMsgs).map(function (name, idx) {
                                var templateId = templateMsgs[name];
                                return {
                                    key: "".concat(name),
                                    label: "".concat(name),
                                    children: ((0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "templateId", name: "templateId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165templateId", type: "text", value: templateId, onChange: function (e) {
                                                        return setValue("templateMsgs.".concat(name), e.target
                                                            .value);
                                                    } }) }) })) }))),
                                };
                            })
                            : [] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u65B0\u5EFA\u6A21\u7248\u6807\u7B7E", onCancel: function () {
                            setModal(false);
                            setMessageType('');
                        }, onOk: function () {
                            if (!messageType) {
                                antd_1.message.error({
                                    content: '请输入标签名称',
                                });
                                return;
                            }
                            if (Object.keys(templateMsgs).includes(messageType)) {
                                antd_1.message.error({
                                    content: '已存在相同的标签名，请重新输入',
                                });
                                return;
                            }
                            setValue("templateMsgs.".concat(messageType), '');
                            setModal(false);
                            setMessageType('');
                        }, open: open, cancelText: "\u53D6\u6D88", okText: "\u786E\u5B9A", destroyOnClose: true }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "\u6807\u7B7E\u540D\u79F0", name: "messageType", help: "\u53EA\u80FD\u8F93\u5165\u82F1\u6587\u548C\u4E2D\u6587" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\u540D\u79F0", type: "text", value: messageType, onChange: function (e) {
                                            return setMessageType(e.target.value.replace(/[0-9-.]/g, ''));
                                        } }) }) })) })) }))] })))] })));
}
exports.default = WechatPublic;
