"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const lodash_1 = require("oak-domain/lib/utils/lodash");
const Colors = ['primary', 'success', 'error', 'warning', 'info'];
function Color(props) {
    const { value = {}, setValue } = props;
    ;
    return ((0, jsx_runtime_1.jsx)(antd_1.Form, { children: Colors.map((ele) => ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: ele, 
            // required
            tooltip: `设置系统【${ele}】颜色`, children: (0, jsx_runtime_1.jsxs)(antd_1.Space.Compact, { block: true, children: [(0, jsx_runtime_1.jsx)(antd_1.ColorPicker, { onChangeComplete: (color) => {
                            setValue(ele, color.toHexString());
                        }, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { value: (0, lodash_1.get)(value, ele), readOnly: true, onChange: (e) => {
                                setValue(ele, e.target.value);
                            } }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { icon: (0, jsx_runtime_1.jsx)(icons_1.ClearOutlined, {}), onClick: (e) => {
                            setValue(ele, '');
                        } })] }) }, ele))) }));
}
function Render(props) {
    const { value: styleValue, onChange } = props;
    const setStyle = (path, value) => {
        const newStyle = (0, lodash_1.set)(styleValue || {}, path, value);
        onChange(newStyle);
    };
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { onChange: () => { }, type: "card", items: [
                {
                    label: '颜色',
                    key: 'color',
                    component: Color,
                },
            ].map((ele, i) => {
                const ItemComponent = ele.component;
                return {
                    label: ele.label,
                    key: ele.key,
                    children: ((0, jsx_runtime_1.jsx)(ItemComponent, { value: (0, lodash_1.get)(styleValue, ele.key), setValue: (path, value) => {
                            setStyle(`${ele.key}.${path}`, value);
                        } })),
                };
            }) }) }));
}
exports.default = Render;
