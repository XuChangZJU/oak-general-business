import React from 'react';
import './index.less';
declare type Item = {
    value: string;
    icon: React.ReactNode;
    text: React.ReactNode;
    count?: number;
};
declare type TabBarProps = {
    style?: React.CSSProperties;
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    children?: React.ReactNode;
    list: Array<Item>;
    onChange?: (value: string, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    fixed?: boolean;
    bordered?: boolean;
    value?: string;
};
declare const _default: React.MemoExoticComponent<(props: TabBarProps) => JSX.Element>;
export default _default;
