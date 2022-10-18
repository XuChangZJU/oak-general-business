import React from 'react';
declare type Item = {
    text: React.ReactNode;
    image: React.ReactNode;
};
declare type GridProps = {
    column?: number;
    gutter?: number;
    className?: string;
    children?: React.ReactNode;
    data: Array<Item>;
    onChange?: (index: number) => void;
};
declare const _default: React.MemoExoticComponent<(props: GridProps) => JSX.Element>;
export default _default;
