import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, List, Tag, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
import { getName } from '../../../utils/randomUser';
export default function render(props) {
    const { stateColor, userArr } = props.data;
    const { onCellClicked, t, goNewUser } = props.methods;
    return (_jsxs("div", { className: Style.container, children: [_jsx(List, { split: true, children: userArr?.map((ele, index) => {
                    return (_jsx(List.Item, { onClick: () => onCellClicked(ele.id), children: _jsx(List.Item.Meta, { avatar: ele.avatar ? (_jsx(Avatar, { className: Style.avatar, src: ele.avatar })) : (_jsx(Avatar, { className: Style.avatar, children: _jsx("span", { className: Style.text, children: getName(ele.name) }) })), title: _jsx("div", { children: ele.name || '--' }), description: _jsxs("div", { className: Style.description, children: [_jsxs("div", { className: Style.row, children: [_jsx("span", { className: Style.label, children: "\u6635\u79F0:\u00A0" }), _jsx("span", { className: Style.value, children: ele.nickname || '--' })] }), _jsxs("div", { className: Style.row, children: [_jsx("span", { className: Style.label, children: "\u624B\u673A\u53F7:\u00A0" }), _jsx("span", { className: Style.value, children: ele.mobile || '--' })] }), _jsx(Tag, { color: stateColor[ele.userState], children: ele.userState
                                            ? t(`user:v.userState.${ele.userState}`)
                                            : '未知' })] }) }) }, index));
                }) }), _jsx("div", { className: Style.fab, children: _jsx(Button, { size: "large", shape: "circle", onClick: () => {
                        goNewUser();
                    }, icon: _jsx(PlusOutlined, {}) }) })] }));
}
