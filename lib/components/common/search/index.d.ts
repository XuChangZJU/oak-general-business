import React from 'react';
import './index.less';
declare type SearchProps = {
    /**
     * 自定义右侧操作按钮文字
     * @default ''
     */
    action?: React.ReactNode;
    /**
     * 是否居中
     * @default false
     */
    center?: boolean;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 是否聚焦
     * @default false
     */
    focus?: boolean;
    /**
     * 左侧文本
     * @default ''
     */
    label?: string;
    /**
     * 左侧图标
     */
    leftIcon?: React.ReactNode;
    /**
     * 占位符
     * @default ''
     */
    placeholder?: string;
    /**
     * 右侧图标
     */
    rightIcon?: React.ReactNode;
    /**
     * 搜索框形状
     * @default 'square'
     */
    shape?: 'square' | 'round';
    /**
     * 值
     * @default ''
     */
    value?: string;
    /**
     * 值，非受控属性
     * @default ''
     */
    defaultValue?: string;
    /**
     * 点击右侧操作按钮文字时触发时触发
     * @default ''
     */
    onActionClick?: (e?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 失去焦点时触发
     * @default ''
     */
    onBlur?: (value: string, e?: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * 值发生变化时触发
     * @default ''
     */
    onChange?: (value: string, e?: React.FormEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => void;
    /**
     * 点击清除时触发
     * @default ''
     */
    onClear?: (e: React.MouseEvent<SVGSVGElement>) => void;
    /**
     * 获得焦点时触发
     * @default ''
     */
    onFocus?: (value: string, e?: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * 提交时触发
     * @default ''
     */
    onSubmit?: (value: string, e?: React.KeyboardEvent<HTMLDivElement> | React.FocusEvent<HTMLInputElement, Element>) => void;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
};
declare const Search: (props: SearchProps) => JSX.Element;
export default Search;
