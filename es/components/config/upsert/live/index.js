import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Row, Col, Card, Divider, Input, Form, Space } from 'antd';
import Styles from './web.module.less';
function Qiniu(props) {
    const { live, setValue } = props;
    return (_jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u4E03\u725B\u4E91\u914D\u7F6E" }), _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                    {
                        key: '0',
                        label: '配置项',
                        children: (_jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "accessKey", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: live?.accessKey, onChange: (e) => setValue(`accessKey`, e.target.value) }) }) }), _jsx(Form.Item, { label: "hub", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165hub", type: "text", value: live?.hub, onChange: (e) => setValue(`hub`, e.target.value) }) }) }), _jsx(Form.Item, { label: "liveHost", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165liveHost", type: "text", value: live?.liveHost, onChange: (e) => setValue(`liveHost`, e.target.value) }) }) }), _jsx(Form.Item, { label: "playDomain", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165playDomain", type: "text", value: live?.playDomain, onChange: (e) => setValue(`playDomain`, e.target.value) }) }) }), _jsx(Form.Item, { label: "playBackDomain", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165playBackDomain", type: "text", value: live?.playBackDomain, onChange: (e) => setValue(`playBackDomain`, e.target.value) }) }) }), _jsx(Form.Item, { label: "playKey", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165playKey", type: "text", value: live?.playKey, onChange: (e) => setValue(`playKey`, e.target.value) }) }) }), _jsx(Form.Item, { label: "publishDomain", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165publishDomain", type: "text", value: live?.publishDomain, onChange: (e) => setValue(`publishDomain`, e.target.value) }) }) }), _jsx(Form.Item, { label: "publishKey", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165publishKey", type: "text", value: live?.publishKey, onChange: (e) => setValue(`publishKey`, e.target.value) }) }) })] })),
                    },
                ] })] }));
}
export default function Cos(props) {
    const { live, setValue } = props;
    const { qiniu } = live;
    return (_jsxs(Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [_jsx(Row, { children: _jsx(Card, { className: Styles.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), _jsx(Qiniu, { live: qiniu, setValue: (path, value) => setValue(`qiniu.${path}`, value) })] }));
}
