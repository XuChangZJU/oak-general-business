import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'antd-mobile';
import Styles from './web.module.less';
export default function Render(props) {
    const { actionss } = props.data;
    const { onClick } = props.methods;
    // icon方案还未最终确定
    if (actionss) {
        return (_jsx("div", { className: Styles.container, children: actionss.map(ele => (_jsx("div", { className: "action", children: _jsx(Button, { color: 'primary', fill: 'outline', onClick: () => onClick(ele.action), children: ele.label }) }))) }));
    }
    return null;
}
