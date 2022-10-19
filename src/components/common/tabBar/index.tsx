import React, { memo } from 'react';
import classNames from 'classnames';

import './index.less';

type Item = {
    value: string;
    icon: React.ReactNode;
    text: React.ReactNode;
    count?: number
};

type TabBarProps = {
    style?: React.CSSProperties; // item容器样式
    className?: string; // item容器样式
    iconClassName?: string;
    textClassName?: string;
    children?: React.ReactNode;
    list: Array<Item>;
    onChange?: (
        value: string,
        event?: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
    fixed: boolean;
    bordered: boolean;
    value?: string;
};

const prefixCls = 'oak';


export default memo((props: TabBarProps) => {
    const {
        style,
        className,
        list,
        onChange,
        iconClassName,
        textClassName,
        fixed = true,
        bordered = true,
        value = '',
    } = props;

    const length = list?.length;

    return (
        <div
            className={classNames(`${prefixCls}-tabBar`, {
                [`${prefixCls}-tabBar--fixed`]: fixed,
                [`${prefixCls}-tabBar--bordered`]: bordered,
            })}
        >
            {list?.map((ele: Item, index: number) => (
                <div
                    key={index}
                    className={classNames(
                        className,
                        `${prefixCls}-tabBar-item`,
                        {
                            [`${prefixCls}-tabBar-item-column-${length}`]:
                                length,
                            [`${prefixCls}-tabBar-item-checked`]:
                                value === ele.value,
                        }
                    )}
                    style={style}
                    onClick={
                        onChange
                            ? (event) => onChange(ele.value, event)
                            : undefined
                    }
                >
                    <div
                        className={classNames(
                            `${prefixCls}-tabBar-item-icon`,
                            iconClassName
                        )}
                    >
                        {typeof ele.icon === 'string' ? (
                            <img
                                className={classNames(
                                    `${prefixCls}-tabBar-item-image`,
                                    iconClassName
                                )}
                                src={ele.icon}
                            />
                        ) : (
                            ele.icon
                        )}
                    </div>
                    <div
                        className={classNames(
                            `${prefixCls}-tabBar-item-text`,
                            textClassName
                        )}
                    >
                        {ele.text}
                    </div>
                </div>
            ))}
        </div>
    );
});
