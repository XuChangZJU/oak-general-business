import React from 'react';
declare type PageHeaderProps = {
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
};
declare const _default: React.MemoExoticComponent<(props: PageHeaderProps) => JSX.Element>;
export default _default;
