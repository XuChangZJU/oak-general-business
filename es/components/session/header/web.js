import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import Style from './web.module.less';
export default function render(props) {
    const { methods, data } = props;
    const { nickname, avatarUrl } = data;
    const defaultUrl = 'http://qiniu.gecomebox.com/static/defaultAvatar.png';
    return (_jsxs("div", { className: Style.header, children: [_jsx(Avatar, { shape: "square", className: Style.avatar, src: avatarUrl || defaultUrl }), _jsx("div", { className: Style.nickname, children: nickname })] }));
}
