import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    count?: number;
    onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    className?: string;
    style?: React.CSSProperties;
}, {
    goMessageList: () => void;
}>): import("react/jsx-runtime").JSX.Element;
