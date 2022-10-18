import React, { memo } from 'react';
import { Row, Col } from 'tdesign-react';
import classNames from 'classnames';

import Style from './index.module.less';

type GridProps = {
    // title?: React.ReactNode;
    // showBack?: boolean;
    // onBack?: () => void;
    // backIcon?: React.ReactNode;
    // delta?: number; //有返回按钮时，返回第几层
    // extra?: React.ReactNode;
    // subTitle?: React.ReactNode;
    // contentMargin?: boolean; // 设置内容是否有边距 默认true 边距为20px
    // tags?: React.ReactNode;
    // children?: React.ReactNode;
    column: number; //一行的个数
    gutter: number; //间隔大小
    className?: string;
    children?: React.ReactNode;
};

const prefixCls = 'grid_item';

export default memo((props: GridProps) => {
    const { className, column = 4, gutter = 0, children } = props;

    return (
        <div className={Style.grid}>
            <div
                className={classNames(className, {
                    [Style[`${prefixCls}-column-${column}`]]: column,
                })}
            >
                {children}
            </div>
        </div>
    );
});
