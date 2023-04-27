import React from 'react';
interface IOption {
    value?: any;
    image: JSX.Element | string;
    name?: string;
}
interface IProps {
    defaultValue?: number | string;
    onChange: (value?: any) => void;
    options: IOption[];
}
declare const _default: React.MemoExoticComponent<(props: IProps) => JSX.Element>;
export default _default;
