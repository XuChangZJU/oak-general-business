import { WebComponentProps } from 'oak-frontend-base';
import React from 'react';
import { EntityDict } from '../../general-app-domain';
import './web.less';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    color?: 'primary' | 'success' | 'error' | 'waring' | 'info' | string;
    size?: string;
    className?: string;
    style?: React.CSSProperties;
}, {}>): import("react/jsx-runtime").JSX.Element;
