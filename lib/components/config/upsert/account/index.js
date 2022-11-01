"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var TabPane = antd_1.Tabs.TabPane;
function TencentAccount(props) {
    var accounts = props.accounts, setValue = props.setValue, removeItem = props.removeItem;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u817E\u8BAF\u4E91\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, tslib_1.__assign({ tabPosition: 'top', size: 'middle', type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: function (targetKey, action) {
                    if (action === 'add') {
                        //add();
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                } }, { children: accounts.length > 0 ? (accounts.map(function (ele, idx) {
                    console.log(ele);
                    return ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u5E10\u53F7".concat(idx + 1) }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "secretId", name: "secretId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretId", type: "text", value: ele.secretId, onChange: function (e) {
                                                return setValue("".concat(idx, ".secretId"), e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "secretKey", name: "secretKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: ele.secretKey, onChange: function (e) {
                                                return setValue("".concat(idx, ".secretKey"), e.target.value);
                                            } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "region", name: "region" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165region", type: "text", value: ele.region, onChange: function (e) {
                                                return setValue("".concat(idx, ".region"), e.target.value);
                                            } }) }) }))] })) }), idx));
                })) : ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u65B0\u5EFA\u5E10\u53F7", closable: false }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "secretId", name: "secretId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretId", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.secretId", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "secretKey", name: "secretKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.secretKey", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "region", name: "region" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165region", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.region", e.target.value);
                                        } }) }) }))] })) }), 0)) }))] })));
}
function QiniuAccount(props) {
    var accounts = props.accounts, setValue = props.setValue, removeItem = props.removeItem;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u4E03\u725B\u4E91\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, tslib_1.__assign({ tabPosition: 'top', size: 'middle', type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: function (targetKey, action) {
                    if (action === 'add') {
                        //add();
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                } }, { children: accounts.length > 0 ? (accounts.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u5E10\u53F7".concat(idx + 1) }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKey", name: "accessKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: ele.accessKey, onChange: function (e) {
                                            return setValue("".concat(idx, ".accessKey"), e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "secretKey", name: "secretKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: ele.secretKey, onChange: function (e) {
                                            return setValue("".concat(idx, ".secretKey"), e.target.value);
                                        } }) }) }))] })) }), idx)); })) : ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u65B0\u5EFA\u5E10\u53F7", closable: false }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKey", name: "accessKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.accessKey", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "secretKey", name: "secretKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.secretKey", e.target.value);
                                        } }) }) }))] })) }), 0)) }))] })));
}
function AliAccount(props) {
    var accounts = props.accounts, setValue = props.setValue, removeItem = props.removeItem;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u963F\u91CC\u4E91\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, tslib_1.__assign({ tabPosition: 'top', size: 'middle', type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: function (targetKey, action) {
                    if (action === 'add') {
                        //add();
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                } }, { children: accounts.length > 0 ? (accounts.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u5E10\u53F7".concat(idx + 1) }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKeyId", name: "accessKeyId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeyId", type: "text", value: ele.accessKeyId, onChange: function (e) {
                                            return setValue("".concat(idx, ".accessKeyId"), e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKeySecret", name: "accessKeySecret" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeySecret", type: "text", value: ele.accessKeySecret, onChange: function (e) {
                                            return setValue("".concat(idx, ".accessKeySecret"), e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "regionId", name: "regionId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165regionId", type: "text", value: ele.regionId, onChange: function (e) {
                                            return setValue("".concat(idx, ".regionId"), e.target.value);
                                        } }) }) }))] })) }), idx)); })) : ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u65B0\u5EFA\u5E10\u53F7", closable: false }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKeyId", name: "accessKeyId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeyId", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.accessKeyId", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "accessKeySecret", name: "accessKeySecret" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeySecret", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.accessKeySecret", e.target.value);
                                        } }) }) })), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "regionId", name: "regionId" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165regionId", type: "text", value: "", onChange: function (e) {
                                            return setValue("0.regionId", e.target.value);
                                        } }) }) }))] })) }), 0)) }))] })));
}
function AmapAccount(props) {
    var accounts = props.accounts, setValue = props.setValue, removeItem = props.removeItem;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, tslib_1.__assign({ flex: "auto" }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, tslib_1.__assign({ orientation: "left", className: web_module_less_1.default.title }, { children: "\u9AD8\u5FB7\u4E91\u914D\u7F6E" })), (0, jsx_runtime_1.jsx)(antd_1.Tabs, tslib_1.__assign({ tabPosition: "top", size: "middle", type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: function (targetKey, action) {
                    if (action === 'add') {
                        //add();
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                } }, { children: accounts.length > 0 ? (accounts.map(function (ele, idx) { return ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u5E10\u53F7".concat(idx + 1) }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "webApiKey", name: "webApiKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165webApiKey", type: "text", value: ele.webApiKey, onChange: function (e) {
                                        return setValue("".concat(idx, ".webApiKey"), e.target.value);
                                    } }) }) })) })) }), idx)); })) : ((0, jsx_runtime_1.jsx)(TabPane, tslib_1.__assign({ tab: "\u65B0\u5EFA\u5E10\u53F7", closable: false }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form, tslib_1.__assign({ colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 } }, { children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, tslib_1.__assign({ label: "webApiKey", name: "webApiKey" }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165webApiKey", type: "text", value: "", onChange: function (e) {
                                        return setValue("0.webApiKey", e.target.value);
                                    } }) }) })) })) }), 0)) }))] })));
}
function Account(props) {
    var account = props.account, setValue = props.setValue, removeItem = props.removeItem;
    var tencent = account.tencent, qiniu = account.qiniu, ali = account.ali, amap = account.amap;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical", size: "middle", style: { display: 'flex' } }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ className: web_module_less_1.default.tips }, { children: "\u6BCF\u79CD\u4E91\u5382\u5546\u5747\u53EF\u914D\u7F6E\u591A\u4E2A\u5E10\u53F7\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" })) }), (0, jsx_runtime_1.jsx)(TencentAccount, { accounts: tencent || [], setValue: function (path, value) { return setValue("tencent.".concat(path), value); }, removeItem: function (path, index) { return removeItem("tencent", index); } }), (0, jsx_runtime_1.jsx)(QiniuAccount, { accounts: qiniu || [], setValue: function (path, value) { return setValue("qiniu.".concat(path), value); }, removeItem: function (path, index) { return removeItem("qiniu", index); } }), (0, jsx_runtime_1.jsx)(AliAccount, { accounts: ali || [], setValue: function (path, value) { return setValue("ali.".concat(path), value); }, removeItem: function (path, index) { return removeItem("ali", index); } }), (0, jsx_runtime_1.jsx)(AmapAccount, { accounts: amap || [], setValue: function (path, value) { return setValue("amap.".concat(path), value); }, removeItem: function (path, index) { return removeItem("amap", index); } })] })));
}
exports.default = Account;
