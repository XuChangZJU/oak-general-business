import React from 'react';
import { Avatar } from 'antd';
import Styles from './web.module.less';
import OakIcon from 'oak-frontend-base/es/components/icon';
export default function Render(props) {
    const { data: { avatarUrl, shape, size, iconColor, iconName, onClick } } = props;
    return avatarUrl ? (<Avatar className={onClick ? Styles.avatar : undefined} src={avatarUrl} shape={shape} size={size} onClick={onClick}/>) : (<Avatar className={onClick ? Styles.avatar : undefined} icon={<OakIcon name={iconName} color={iconColor}/>} shape={shape} size={size} onClick={onClick}/>);
}
