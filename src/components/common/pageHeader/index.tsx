import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'tdesign-react';
import { ArrowLeftIcon } from 'tdesign-icons-react';
import classNames from 'classnames';

import './index.less';

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
    const prefixCls = 'oak';
    const navigate = useNavigate();

    return (
        <div
            style={style}
            className={classNames(`${prefixCls}-pageHeader`, className)}
        >
            {(title || showBack || subTitle || tags || extra) && (
                <div className={`${prefixCls}-pageHeader-header`}>
                    <Row>
                        <Col flex="auto">
                            {showBack && (
                                <Button
                                    shape="square"
                                    variant="text"
                                    className={`${prefixCls}-pageHeader-header-back`}
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
                                            className={`${prefixCls}-pageHeader-header-backIcon`}
                                        />
                                    )}
                                </Button>
                            )}
                            {title && (
                                <span
                                    className={`${prefixCls}-pageHeader-header-title`}
                                >
                                    {title}
                                </span>
                            )}
                            {subTitle && (
                                <span
                                    className={`${prefixCls}-pageHeader-header-subTitle`}
                                >
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
                className={classNames(
                    `${prefixCls}-pageHeader-content`,
                    contentClassName,
                    {
                        [`${prefixCls}-pageHeader-content-margin`]:
                            contentMargin,
                    }
                )}
            >
                {children}
            </div>
        </div>
    );
});