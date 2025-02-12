import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    count?: number;
    onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    className?: string;
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    buttonClassName?: string;
}, {
    goMessageList: () => void;
}>): React.JSX.Element;
