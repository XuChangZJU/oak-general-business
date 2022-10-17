import * as React from 'react';
import classNames from 'classnames';

import Style from './index.module.less';

import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';

const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;

type EmptyProps = {
    className?: string;
    style?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    image?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
};

interface EmptyType extends React.FC<EmptyProps> {
    PRESENTED_IMAGE_DEFAULT: React.ReactNode;
    PRESENTED_IMAGE_SIMPLE: React.ReactNode;
}

const Empty: EmptyType = (props: EmptyProps) => {
    const {
        className,
        image = defaultEmptyImg,
        description,
        children,
        imageStyle,
        ...restProps
    } = props;
    const des = typeof description !== 'undefined' ? description : '暂无数据';
    const alt = typeof des === 'string' ? des : 'empty';

    let imageNode: React.ReactNode = null;

    if (typeof image === 'string') {
        imageNode = <img alt={alt} src={image} />;
    } else {
        imageNode = image;
    }

    return (
        <div
            className={classNames(
                Style['oak-empty'],
                {
                    [Style['oak-empty-normal']]: image === simpleEmptyImg,
                },
                className
            )}
            {...restProps}
        >
            <div className={Style['oak-empty-image']} style={imageStyle}>
                {imageNode}
            </div>
            {des && <div className={Style['oak-empty-description']}>{des}</div>}
            {children && (
                <div className={Style['oak-empty-footer']}>{children}</div>
            )}
        </div>
    );
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;