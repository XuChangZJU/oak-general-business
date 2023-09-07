import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Space } from 'antd';
export default function Render(props) {
    const { actionss, onActionClick } = props.data;
    // icon方案还未最终确定
    if (actionss) {
        return (_jsx(Space, { children: actionss.map((ele) => (_jsx(Button, { color: "primary", type: "default", onClick: () => onActionClick(ele.action), children: ele.label }))) }));
    }
    return null;
}
