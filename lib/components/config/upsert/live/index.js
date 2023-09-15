"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Qiniu(props) {
    const { live, setValue } = props;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Col, { flex: "auto", children: [(0, jsx_runtime_1.jsx)(antd_1.Divider, { orientation: "left", className: web_module_less_1.default.title, children: "\u4E03\u725B\u4E91\u914D\u7F6E" }), (0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                    {
                        key: '0',
                        label: '配置项',
                        children: ((0, jsx_runtime_1.jsxs)(antd_1.Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "accessKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: live?.accessKey, onChange: (e) => setValue(`accessKey`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "hub", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165hub", type: "text", value: live?.hub, onChange: (e) => setValue(`hub`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "liveHost", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165liveHost", type: "text", value: live?.liveHost, onChange: (e) => setValue(`liveHost`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "playDomain", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165playDomain", type: "text", value: live?.playDomain, onChange: (e) => setValue(`playDomain`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "playBackDomain", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165playBackDomain", type: "text", value: live?.playBackDomain, onChange: (e) => setValue(`playBackDomain`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "playKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165playKey", type: "text", value: live?.playKey, onChange: (e) => setValue(`playKey`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "publishDomain", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165publishDomain", type: "text", value: live?.publishDomain, onChange: (e) => setValue(`publishDomain`, e.target.value) }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "publishKey", children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165publishKey", type: "text", value: live?.publishKey, onChange: (e) => setValue(`publishKey`, e.target.value) }) }) })] })),
                    },
                ] })] }));
}
function Cos(props) {
    const { live, setValue } = props;
    const { qiniu } = live;
    return ((0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, { className: web_module_less_1.default.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), (0, jsx_runtime_1.jsx)(Qiniu, { live: qiniu, setValue: (path, value) => setValue(`qiniu.${path}`, value) })] }));
}
exports.default = Cos;
