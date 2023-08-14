import React from 'react';
import { Dropdown, Button, Avatar } from 'antd';
import Styles from './web.module.less';

import { EntityDict } from '../../../oak-app-domain';
import OakIcon from '../../icon/index';
import { WebComponentProps } from 'oak-frontend-base';
import { AvatarSize } from 'antd/es/avatar/SizeContext';


export default function Render(props: WebComponentProps<EntityDict, 'token', false, {
    avatarUrl: string;
    shape?: 'circle' | 'square';
    size: AvatarSize;
    iconColor?: string;
    iconName?: string;
    iconLarger?: string;
    onClick?: () => void;
}>) {
    const { data: { avatarUrl, shape, size, iconColor, iconName, onClick } } = props;
    return avatarUrl ? (
        <Avatar
            className={onClick ? Styles.avatar : undefined}
            src={avatarUrl}
            shape={shape}
            size={size}
            onClick={onClick}
        />
    ) : (
        <Avatar
            className={onClick ? Styles.avatar : undefined}
            icon={
                <OakIcon name={iconName} color={iconColor} />
            }
            shape={shape}
            size={size}
            onClick={onClick}
        />
    );
}
