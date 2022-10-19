import React, { memo } from 'react';
import { FileCopyIcon } from 'tdesign-icons-react';
import classNames from 'classnames';

import './index.less';

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
    const prefixCls = 'oak';

    const isHeadingElement = headingElement.includes(variant);

    const Component = isHeadingElement
        ? (variant as HTMLHeadingElement)
        : 'span';

    return (
        <Component
            style={style}
            onClick={!disabled ? onClick : undefined}
            className={classNames(`${prefixCls}-typography`, className, {
                [`${prefixCls}-typography-${variant}-${size}`]:
                    !isHeadingElement,
                [`${prefixCls}-typography-color-${theme}`]: !disabled,
                [`${prefixCls}-typography-italic`]: italic,
                [`${prefixCls}-typography-underline`]: underline,
                [`${prefixCls}-typography-delete`]: delete2,
                [`${prefixCls}-typography-strong`]: strong,
                [`${prefixCls}-typography-keyboard`]: keyboard,
                [`${prefixCls}-typography-code`]: code,
                [`${prefixCls}-typography-mark`]: mark,
                [`${prefixCls}-typography-link`]: link,
                [`${prefixCls}-typography-disabled`]: disabled,
            })}
        >
            {children}
        </Component>
    );
});