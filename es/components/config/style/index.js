import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Space, Form, Input, Button, Tabs, ColorPicker } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { set, get } from 'oak-domain/lib/utils/lodash';
const Colors = ['primary', 'success', 'error', 'warning', 'info'];
function Color(props) {
    const { value = {}, setValue } = props;
    ;
    return (_jsx(Form, { children: Colors.map((ele) => (_jsx(Form.Item, { label: ele, 
            // required
            tooltip: `设置系统【${ele}】颜色`, children: _jsxs(Space.Compact, { block: true, children: [_jsx(ColorPicker, { onChangeComplete: (color) => {
                            setValue(ele, color.toHexString());
                        }, children: _jsx(Input, { value: get(value, ele), readOnly: true, onChange: (e) => {
                                setValue(ele, e.target.value);
                            } }) }), _jsx(Button, { icon: _jsx(ClearOutlined, {}), onClick: (e) => {
                            setValue(ele, '');
                        } })] }) }, ele))) }));
}
export default function Render(props) {
    const { value: styleValue, onChange } = props;
    const setStyle = (path, value) => {
        const newStyle = set(styleValue || {}, path, value);
        onChange(newStyle);
    };
    return (_jsx("div", { children: _jsx(Tabs, { onChange: () => { }, type: "card", items: [
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
                    children: (_jsx(ItemComponent, { value: get(styleValue, ele.key), setValue: (path, value) => {
                            setStyle(`${ele.key}.${path}`, value);
                        } })),
                };
            }) }) }));
}
