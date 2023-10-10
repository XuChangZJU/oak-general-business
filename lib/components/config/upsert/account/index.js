"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function TencentAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u817E\u8BAF\u4E91\u914D\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: (targetKey, action) => {
                    if (action === 'add') {
                        addItem('', accounts.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: accounts.length > 0
                    ? accounts.map((ele, idx) => ({
                        key: `${idx}`,
                        label: `帐号${idx + 1}`,
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "secretId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretId", type: "text", value: ele.secretId, onChange: (e) => setValue(`${idx}.secretId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "secretKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: ele.secretKey, onChange: (e) => setValue(`${idx}.secretKey`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "region", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165region", type: "text", value: ele.region, onChange: (e) => setValue(`${idx}.region`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "endpoint", 
                                    // name="endpoint"
                                    tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Atencentcloudapi.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: ele.endpoint, onChange: (e) => setValue(`${idx}.endpoint`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u77ED\u4FE1endpoint", 
                                    //name="smsEndpoint"
                                    tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Asms.tencentcloudapi.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: ele.smsEndpoint, onChange: (e) => setValue(`${idx}.smsEndpoint`, e.target.value) }) }) })] })),
                    }))
                    : [
                        {
                            label: '新建帐号',
                            key: '0',
                            children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "secretId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretId", type: "text", value: "", onChange: (e) => setValue(`0.secretId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "secretKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: "", onChange: (e) => setValue(`0.secretKey`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "region", 
                                        // name="region"
                                        tooltip: "\u5730\u57DF, \u534E\u5317\u5730\u533A(\u5317\u4EAC): ap-beijing\u3001 \u534E\u5357\u5730\u533A(\u5E7F\u5DDE): ap-guangzhou\u3001\u534E\u4E1C\u5730\u533A(\u5357\u4EAC): ap-nanjing", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165region", type: "text", value: "", onChange: (e) => setValue(`0.region`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u77ED\u4FE1endpoint", 
                                        // name="smsEndpoint"
                                        tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Asms.tencentcloudapi.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: "", onChange: (e) => setValue(`0.smsEndpoint`, e.target.value) }) }) })] })),
                        },
                    ] })] }));
}
function QiniuAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u4E03\u725B\u4E91\u914D\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: (targetKey, action) => {
                    if (action === 'add') {
                        addItem('', accounts.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: accounts.length > 0
                    ? accounts.map((ele, idx) => ({
                        key: `${idx}`,
                        label: `帐号${idx + 1}`,
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: ele.accessKey, onChange: (e) => setValue(`${idx}.accessKey`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "secretKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: ele.secretKey, onChange: (e) => setValue(`${idx}.secretKey`, e.target.value) }) }) })] })),
                    }))
                    : [
                        {
                            label: '新建帐号',
                            key: '0',
                            children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: "", onChange: (e) => setValue(`0.accessKey`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "secretKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165secretKey", type: "text", value: "", onChange: (e) => setValue(`0.secretKey`, e.target.value) }) }) })] })),
                        },
                    ] })] }));
}
function AliAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u963F\u91CC\u4E91\u914D\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: (targetKey, action) => {
                    if (action === 'add') {
                        addItem('', accounts.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: accounts.length > 0
                    ? accounts.map((ele, idx) => ({
                        key: `${idx}`,
                        label: `帐号${idx + 1}`,
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKeyId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeyId", type: "text", value: ele.accessKeyId, onChange: (e) => setValue(`${idx}.accessKeyId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKeySecret", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeySecret", type: "text", value: ele.accessKeySecret, onChange: (e) => setValue(`${idx}.accessKeySecret`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "regionId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165regionId", type: "text", value: ele.regionId, onChange: (e) => setValue(`${idx}.regionId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "endpoint", 
                                    //name="endpoint"
                                    tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Adysmsapi.aliyuncs.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: ele.endpoint, onChange: (e) => setValue(`${idx}.endpoint`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "apiVersion", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165apiVersion", type: "text", value: ele.apiVersion, onChange: (e) => setValue(`${idx}.apiVersion`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u77ED\u4FE1endpoint", 
                                    //name="smsEndpoint"
                                    tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Adysmsapi.aliyuncs.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: ele.smsEndpoint, onChange: (e) => setValue(`${idx}.smsEndpoint`, e.target.value) }) }) })] })),
                    }))
                    : [
                        {
                            label: '新建帐号',
                            key: '0',
                            children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKeyId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeyId", type: "text", value: "", onChange: (e) => setValue(`0.accessKeyId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKeySecret", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKeySecret", type: "text", value: "", onChange: (e) => setValue(`0.accessKeySecret`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "regionId", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165regionId", type: "text", value: "", onChange: (e) => setValue(`0.regionId`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "endpoint", 
                                        // name="endpoint"
                                        tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Adysmsapi.aliyuncs.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: "", onChange: (e) => setValue(`0.endpoint`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "apiVersion", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165apiVersion", type: "text", value: "", onChange: (e) => setValue(`0.apiVersion`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u77ED\u4FE1endpoint", 
                                        //name="smsEndpoint"
                                        tooltip: "\u8BBF\u95EE\u7684\u57DF\u540D\uFF0C\u5982\uFF1Adysmsapi.aliyuncs.com", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165endpoint", type: "text", value: "", onChange: (e) => setValue(`0.smsEndpoint`, e.target.value) }) }) })] })),
                        },
                    ] })] }));
}
function AmapAccount(props) {
    const { accounts, setValue, removeItem, addItem } = props;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u9AD8\u5FB7\u4E91\u914D\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: "top", size: "middle", type: "editable-card", hideAdd: !(accounts.length > 0), onEdit: (targetKey, action) => {
                    if (action === 'add') {
                        addItem('', accounts.length);
                    }
                    else {
                        removeItem('', parseInt(targetKey, 10));
                    }
                }, items: accounts.length > 0
                    ? accounts.map((ele, idx) => ({
                        key: `${idx}`,
                        label: `帐号${idx + 1}`,
                        children: ((0, jsx_runtime_1.jsx)(antd_1.Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "webApiKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165webApiKey", type: "text", value: ele.webApiKey, onChange: (e) => setValue(`${idx}.webApiKey`, e.target.value) }) }) }) })),
                    }))
                    : [
                        {
                            label: '新建帐号',
                            key: '0',
                            children: ((0, jsx_runtime_1.jsx)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "webApiKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165webApiKey", type: "text", value: "", onChange: (e) => setValue(`0.webApiKey`, e.target.value) }) }) }) })),
                        },
                    ] })] }));
}
function Account(props) {
    const { account, setValue, removeItem } = props;
    const { tencent, qiniu, ali, amap } = account;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, { className: web_module_less_1.default.tips, children: "\u6BCF\u79CD\u4E91\u5382\u5546\u5747\u53EF\u914D\u7F6E\u591A\u4E2A\u5E10\u53F7\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), (0, jsx_runtime_1.jsx)(TencentAccount, { accounts: tencent || [], setValue: (path, value) => setValue(`tencent.${path}`, value), removeItem: (path, index) => removeItem(`tencent`, index), addItem: (path, index) => setValue(`tencent.${index}`, {}) }), (0, jsx_runtime_1.jsx)(QiniuAccount, { accounts: qiniu || [], setValue: (path, value) => setValue(`qiniu.${path}`, value), removeItem: (path, index) => removeItem(`qiniu`, index), addItem: (path, index) => setValue(`qiniu.${index}`, {}) }), (0, jsx_runtime_1.jsx)(AliAccount, { accounts: ali || [], setValue: (path, value) => setValue(`ali.${path}`, value), removeItem: (path, index) => removeItem(`ali`, index), addItem: (path, index) => setValue(`ali.${index}`, {}) }), (0, jsx_runtime_1.jsx)(AmapAccount, { accounts: amap || [], setValue: (path, value) => setValue(`amap.${path}`, value), removeItem: (path, index) => removeItem(`amap`, index), addItem: (path, index) => setValue(`amap.${index}`, {}) })] }));
}
exports.default = Account;
