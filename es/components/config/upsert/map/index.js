import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Row, Col, Card, Divider, Input, Form, Space, } from 'antd';
import Styles from './web.module.less';
function Qiniu(props) {
    const { map, setValue } = props;
    return (_jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u9AD8\u5FB7\u914D\u7F6E" }), _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                    {
                        key: '0',
                        label: '配置项',
                        children: (_jsx(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: _jsx(Form.Item, { label: "webApiKey", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165webApiKey", type: "text", value: map?.webApiKey, onChange: (e) => setValue(`webApiKey`, e.target.value) }) }) }) })),
                    },
                ] })] }));
}
export default function Cos(props) {
    const { map, setValue } = props;
    const { amap } = map;
    return (_jsxs(Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [_jsx(Row, { children: _jsx(Card, { className: Styles.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), _jsx(Qiniu, { map: amap, setValue: (path, value) => setValue(`amap.${path}`, value) })] }));
}
