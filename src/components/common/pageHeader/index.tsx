import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'tdesign-react';
import { ArrowLeftIcon } from 'tdesign-icons-react';
import classNames from 'classnames';

import Style from './index.module.less';

type PageHeaderProps = {
    style?: React.CSSProperties;
    className?: string;
    title?: React.ReactNode;
    showBack?: boolean;
    onBack?: () => void;
    backIcon?: React.ReactNode;
    delta?: number; //有返回按钮时，返回第几层
    extra?: React.ReactNode;
    subTitle?: React.ReactNode;
    contentMargin?: boolean; // 设置内容是否有边距 默认true 边距为20px
    contentStyle?: React.CSSProperties;
    contentClassName?: string;
    tags?: React.ReactNode;
    children?: React.ReactNode;
};

export default memo((props: PageHeaderProps) => {
    const {
        style,
        className,
        children,
        title,
        subTitle,
        extra,
        showBack,
        onBack,
        backIcon,
        delta,
        contentMargin = true,
        contentStyle,
        contentClassName,
        tags,
    } = props;
    const navigate = useNavigate();

    return (
        <div style={style} className={classNames(Style.pageHeader, className)}>
            {(title || showBack || subTitle || tags || extra) && (
                <div className={Style.header}>
                    <Row>
                        <Col flex="auto">
                            {showBack && (
                                <Button
                                    shape="square"
                                    variant="text"
                                    className={Style.back}
                                    onClick={() => {
                                        if (typeof onBack === 'function') {
                                            onBack();
                                            return;
                                        }
                                        navigate(delta || -1);
                                    }}
                                >
                                    {backIcon || (
                                        <ArrowLeftIcon
                                            className={Style.backIcon}
                                        />
                                    )}
                                </Button>
                            )}
                            {title && (
                                <span className={Style.title}>{title}</span>
                            )}
                            {subTitle && (
                                <span className={Style.subTitle}>
                                    {subTitle}
                                </span>
                            )}
                            {tags}
                        </Col>
                        <Col flex="auto">{extra}</Col>
                    </Row>
                </div>
            )}

            <div
                style={contentStyle}
                className={classNames(Style.content, contentClassName, {
                    [Style.contentMargin]: contentMargin,
                })}
            >
                {children}
            </div>
        </div>
    );
});