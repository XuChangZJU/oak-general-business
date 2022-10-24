import React from 'react';
import './index.less';
declare type Item = {
    text: React.ReactNode;
    image: React.ReactNode;
};
declare type GridProps = {
    column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    gutter?: number;
    style?: React.CSSProperties;
    className?: string;
    imageClassName?: string;
    textClassName?: string;
    children?: React.ReactNode;
    list: Array<Item>;
    onChange?: (index: number, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};
declare const _default: React.MemoExoticComponent<(props: GridProps) => JSX.Element>;
export default _default;
