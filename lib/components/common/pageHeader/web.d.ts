import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import './index.less';
type PageHeaderProps = {
    style?: React.CSSProperties;
    className?: string;
    title?: React.ReactNode;
    showBack?: boolean;
    onBack?: () => void;
    backIcon?: React.ReactNode;
    delta?: number;
    extra?: React.ReactNode;
    subTitle?: React.ReactNode;
    contentMargin?: boolean;
    contentStyle?: React.CSSProperties;
    contentClassName?: string;
    tags?: React.ReactNode;
    children?: React.ReactNode;
    showHeader?: boolean;
};
export default function Render(props: WebComponentProps<EntityDict, keyof EntityDict, false, PageHeaderProps, {
    goBack: (delta?: number) => void;
}>): import("react/jsx-runtime").JSX.Element;
export {};
