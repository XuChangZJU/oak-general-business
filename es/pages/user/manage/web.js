import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { List, Tag, Avatar, FloatingBubble } from 'antd-mobile';
import { PlusOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
export default function render(props) {
    const { stateColor, userArr, isRoot } = props.data;
    const { onCellClicked, t, goNewUser } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [_jsx(List, { children: userArr?.map((ele, index) => {
                    return (_jsx(List.Item, { onClick: () => onCellClicked(ele.id), prefix: _jsx(Avatar, { className: Style.avatar, src: ele.avatar }), title: _jsx("div", { children: ele.name || '--' }), description: _jsxs("div", { className: Style.description, children: [_jsxs("div", { className: Style.row, children: [_jsx("span", { className: Style.label, children: "\u6635\u79F0:\u00A0" }), _jsx("span", { className: Style.value, children: ele.nickname || '--' })] }), _jsxs("div", { className: Style.row, children: [_jsx("span", { className: Style.label, children: "\u624B\u673A\u53F7:\u00A0" }), _jsx("span", { className: Style.value, children: ele.mobile || '--' })] }), _jsx(Tag, { color: stateColor[ele.userState], children: ele.userState
                                        ? t(`user:v.userState.${ele.userState}`)
                                        : '未知' })] }) }, index));
                }) }), isRoot && (_jsx(FloatingBubble, { axis: "x", magnetic: "x", style: {
                    '--initial-position-bottom': '24px',
                    '--initial-position-right': '24px',
                    '--edge-distance': '24px',
                }, onClick: () => {
                    goNewUser();
                }, children: _jsx(PlusOutlined, {}) }))] }));
}
