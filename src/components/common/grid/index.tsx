import React, { memo } from 'react';
import classNames from 'classnames';

import Style from './index.module.less';

type Item = {
    text: React.ReactNode;
    image: React.ReactNode;
};

type GridProps = {
    column?: 1 | 2 | 3 | 4 | 5 | 6; //一行的个数
    gutter?: number; //间隔大小
    style?: React.CSSProperties; // item容器样式
    className?: string; // item容器样式
    imageClassName?: string;
    textClassName?: string;
    children?: React.ReactNode;
    list: Array<Item>;
    onChange?: (
        index: number,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
};

const prefixCls = 'grid';

const itemPrefixCls = prefixCls + '_item';

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
            className={Style[prefixCls]}
            style={{
                gap: gutter,
            }}
        >
            {list?.map((ele: Item, index: number) => (
                <div
                    key={index}
                    className={classNames(className, Style[itemPrefixCls], {
                        [Style[`${itemPrefixCls}-column-${column}`]]: column,
                    })}
                    style={style}
                    onClick={
                        onChange ? (event) => onChange(index, event) : undefined
                    }
                >
                    {typeof ele.image === 'string' ? (
                        <img
                            className={classNames(Style.image, imageClassName)}
                            src={ele.image}
                        />
                    ) : (
                        ele.image
                    )}
                    <div className={Style.text}>
                        <div
                            className={classNames(Style.title, textClassName)}
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
