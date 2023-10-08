import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, Row, Col, Card, Divider, Input, Form, Space, Select, } from 'antd';
import Styles from './web.module.less';
function QiniuCos(props) {
    const { cos, setValue, removeItem } = props;
    return (_jsxs(Col, { flex: "auto", children: [_jsx(Divider, { orientation: "left", className: Styles.title, children: "\u4E03\u725B\u4E91\u914D\u7F6E" }), _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "card", items: [
                    {
                        key: '0',
                        label: '配置项',
                        children: (_jsxs(Form, { colon: true, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "accessKey", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165accessKey", type: "text", value: cos?.accessKey, onChange: (e) => setValue(`accessKey`, e.target.value) }) }) }), _jsx(Form.Item, { label: "uploadHost", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165uploadHost", type: "text", value: cos?.uploadHost, onChange: (e) => setValue(`uploadHost`, e.target.value) }) }) }), _jsx(Divider, { orientation: "left", className: Styles.title, children: "bucket\u914D\u7F6E" }), _jsx(Tabs, { tabPosition: 'top', size: 'middle', type: "editable-card", 
                                    // hideAdd={!(sms.length > 0)}
                                    onEdit: (targetKey, action) => {
                                        if (action === 'add') {
                                            setValue(`buckets.${cos?.buckets?.length || 0}`, {});
                                        }
                                        else {
                                            removeItem('buckets', parseInt(targetKey, 10));
                                        }
                                    }, items: cos?.buckets?.length > 0
                                        ? cos.buckets.map((ele, idx) => ({
                                            key: `${idx}`,
                                            label: `bucket:${idx + 1}`,
                                            children: (_jsxs(Form, { colon: false, labelAlign: "left", layout: "vertical", style: { marginTop: 10 }, children: [_jsx(Form.Item, { label: "name", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165name", type: "text", value: ele.name, onChange: (e) => setValue(`buckets.${idx}.name`, e.target.value) }) }) }), _jsx(Form.Item, { label: "domain", children: _jsx(_Fragment, { children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165domain", type: "text", value: ele.domain, onChange: (e) => setValue(`buckets.${idx}.domain`, e.target.value) }) }) }), _jsx(Form.Item, { label: "protocol", children: _jsx(_Fragment, { children: _jsx(Select, { mode: "multiple", allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u534F\u8BAE", value: ele?.protocol, onChange: (value) => {
                                                                    setValue(`buckets.${idx}.protocol`, value);
                                                                }, options: [
                                                                    {
                                                                        label: 'http',
                                                                        value: 'http',
                                                                    },
                                                                    {
                                                                        label: 'https',
                                                                        value: 'https',
                                                                    },
                                                                ] }) }) })] })),
                                        }))
                                        : [] }), _jsx(Form.Item, { label: "defaultBucket", children: _jsx(_Fragment, { children: _jsx(Select, { allowClear: true, style: { width: '100%' }, placeholder: "\u8BF7\u9009\u62E9\u9ED8\u8BA4bucket", value: cos?.defaultBucket, onChange: (value) => {
                                                setValue(`defaultBucket`, value);
                                            }, options: cos?.buckets?.map(ele => ({
                                                label: ele.name,
                                                value: ele.name
                                            })) }) }) })] })),
                    },
                ] })] }));
}
export default function Cos(props) {
    const { cos, setValue, removeItem } = props;
    const { qiniu } = cos;
    return (_jsxs(Space, { direction: "vertical", size: "middle", style: { display: 'flex' }, children: [_jsx(Row, { children: _jsx(Card, { className: Styles.tips, children: "\u6BCF\u79CD\u5747\u53EF\u914D\u7F6E\u4E00\u4E2A\uFF0C\u76F8\u5E94\u7684\u670D\u52A1\u6240\u4F7F\u7528\u7684\u5E10\u53F7\u8BF7\u51C6\u786E\u5BF9\u5E94" }) }), _jsx(QiniuCos, { cos: qiniu, setValue: (path, value) => setValue(`qiniu.${path}`, value), removeItem: (path, index) => removeItem(`qiniu.${path}`, index) })] }));
}
