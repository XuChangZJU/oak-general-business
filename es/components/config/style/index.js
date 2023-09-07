import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Input, Tabs } from 'antd';
import { set, get } from 'oak-domain/lib/utils/lodash';
const Colors = ['primary', 'success', 'error', 'warning', 'info'];
function Color(props) {
    const { value = {}, setValue } = props;
    ;
    return (_jsx(Form, { children: Colors.map((ele) => (_jsx(Form.Item, { label: ele, 
            // required
            // name="folder"
            tooltip: `设置系统【${ele}】颜色`, children: _jsx(_Fragment, { children: _jsx(Input, { onChange: (e) => {
                        setValue(ele, e.target.value);
                    }, value: get(value, ele) }) }) }, ele))) }));
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
