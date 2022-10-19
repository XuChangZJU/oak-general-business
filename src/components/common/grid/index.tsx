import React, { memo } from 'react';
import classNames from 'classnames';

import './index.less';

type Item = {
    text: React.ReactNode;
    image: React.ReactNode;
};

type GridProps = {
    column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; //一行的个数
    gutter?: number; //间隔大小
    style?: React.CSSProperties; // item容器样式
    className?: string; // item容器样式
    imageClassName?: string;
    textClassName?: string;
    children?: React.ReactNode;
    list: Array<Item>;
    onChange?: (
        index: number,
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
};

const prefixCls = 'oak';

export default memo((props: GridProps) => {
    const {
        style,
        className,
        column = 4,
        gutter = 0,
        list,
        onChange,
        imageClassName,
        textClassName,
    } = props;

    return (
        <div
            className={`${prefixCls}-grid`}
            style={{
                gap: gutter,
            }}
        >
            {list?.map((ele: Item, index: number) => (
                <div
                    key={index}
                    className={classNames(className, `${prefixCls}-grid-item`, {
                        [`${prefixCls}-grid-item-column-${column}`]: column,
                    })}
                    style={style}
                    onClick={
                        onChange ? (event) => onChange(index, event) : undefined
                    }
                >
                    {typeof ele.image === 'string' ? (
                        <img
                            className={classNames(
                                `${prefixCls}-grid-item-image`,
                                imageClassName
                            )}
                            src={ele.image}
                        />
                    ) : (
                        ele.image
                    )}
                    <div className={`${prefixCls}-grid-item-text`}>
                        <div
                            className={classNames(
                                `${prefixCls}-grid-item-title`,
                                textClassName
                            )}
                            style={{
                                paddingTop: 8,
                                marginBottom: 4,
                            }}
                        >
                            {ele.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});
