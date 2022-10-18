import React, { memo } from 'react';
import classNames from 'classnames';

import Style from './index.module.less';

type Item = {
    text: React.ReactNode;
    image: React.ReactNode;
};

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
    column?: number; //一行的个数
    gutter?: number; //间隔大小
    className?: string;
    children?: React.ReactNode;
    data: Array<Item>;
    onChange?: (index: number) => void;
};

const prefixCls = 'grid_item';

export default memo((props: GridProps) => {
    const { className, column = 4, gutter = 0, data, onChange } = props;

    return (
        <div className={Style.grid}>
            {data?.map((ele: Item, index: number) => (
                <div
                    key={index}
                    className={classNames(className, Style[prefixCls], {
                        [Style[`${prefixCls}-column-${column}`]]: column,
                    })}
                    onClick={() => onChange && onChange(index)}
                >
                    {typeof ele.image === 'string' ? (
                        <img src={ele.image} />
                    ) : (
                        ele.image
                    )}
                    {typeof ele.text === 'string' ? (
                        <div>{ele.text}</div>
                    ) : (
                        ele.text
                    )}
                </div>
            ))}
        </div>
    );
});
