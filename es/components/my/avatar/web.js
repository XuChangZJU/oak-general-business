import { jsx as _jsx } from "react/jsx-runtime";
import { Avatar } from 'antd';
import Styles from './web.module.less';
import OakIcon from '../../icon/index';
export default function Render(props) {
    const { data: { avatarUrl, shape, size, iconColor, iconName, onClick } } = props;
    return avatarUrl ? (_jsx(Avatar, { className: onClick ? Styles.avatar : undefined, src: avatarUrl, shape: shape, size: size, onClick: onClick })) : (_jsx(Avatar, { className: onClick ? Styles.avatar : undefined, icon: _jsx(OakIcon, { name: iconName, color: iconColor }), shape: shape, size: size, onClick: onClick }));
}
