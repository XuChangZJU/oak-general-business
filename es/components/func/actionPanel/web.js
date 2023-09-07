import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Space } from 'antd-mobile';
import Style from './mobile.module.less';
export default function Render(props) {
    const { actionss, onActionClick } = props.data;
    // icon方案还未最终确定
    if (actionss) {
        return (_jsx(Space, { wrap: true, className: Style.container, children: actionss.map((ele) => (_jsx(Button, { color: "primary", fill: "outline", onClick: () => onActionClick(ele.action), children: ele.label }))) }));
    }
    return null;
}
