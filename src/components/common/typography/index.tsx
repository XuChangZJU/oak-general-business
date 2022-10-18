import React, { memo } from 'react';
import { FileCopyIcon } from 'tdesign-icons-react';
import classNames from 'classnames';

import Style from './index.module.less';

type HTMLHeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyProps = {
    theme?:
        | 'default'
        | 'secondary'
        | 'primary'
        | 'danger'
        | 'warning'
        | 'success'
        | 'placeholder'
        | 'disabled'
        | 'brand'
        | 'anti'
        | 'link';
    size?: 'small' | 'medium' | 'large'; // variant 为 h1 h2 h3 h4 h5 h6 size不生效 直接使用标签
    variant?:
        | 'link'
        | 'mark'
        | 'body'
        | 'title'
        | 'headline'
        | 'display'
        | HTMLHeadingElement;
    children?: React.ReactNode;
    italic?: boolean;
    strong?: boolean;
    disabled?: boolean;
    underline?: boolean;
    delete?: boolean;
    code?: boolean;
    keyboard?: boolean;
    mark?: boolean;
    link?: boolean;
    onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    style?: React.CSSProperties;
    className?: string;
};

const headingElement = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export default memo((props: TypographyProps) => {
    const {
        children,
        size = 'medium',
        theme = 'default',
        variant = 'title',
        italic = false,
        strong = false,
        disabled = false,
        underline = false,
        delete: delete2 = false,
        code = false,
        keyboard = false,
        mark = false,
        link = false,
        onClick,
        style,
        className,
    } = props;
    const prefixCls = 'oak-typography';

    const isHeadingElement = headingElement.includes(variant);

    const Component = isHeadingElement
        ? (variant as HTMLHeadingElement)
        : 'span';

    return (
        <Component
            style={style}
            onClick={!disabled ? onClick : undefined}
            className={classNames(
                className,
                Style[prefixCls],
                {
                    [Style[`${prefixCls}-${variant}-${size}`]]: !isHeadingElement,
                    [Style[`${prefixCls}-color-${theme}`]]: !disabled,
                    [Style[`${prefixCls}-italic`]]: italic,
                    [Style[`${prefixCls}-underline`]]: underline,
                    [Style[`${prefixCls}-delete`]]: delete2,
                    [Style[`${prefixCls}-strong`]]: strong,
                    [Style[`${prefixCls}-keyboard`]]: keyboard,
                    [Style[`${prefixCls}-code`]]: code,
                    [Style[`${prefixCls}-mark`]]: mark,
                    [Style[`${prefixCls}-link`]]: link,
                    [Style[`${prefixCls}-disabled`]]: disabled,
                }
            )}
        >
            {children}
        </Component>
    );
});