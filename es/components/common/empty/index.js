import * as React from 'react';
import classNames from 'classnames';
import './index.less';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;
const Empty = (props) => {
    const { className, image = defaultEmptyImg, description, children, imageStyle, ...restProps } = props;
    const des = typeof description !== 'undefined' ? description : '暂无数据';
    const alt = typeof des === 'string' ? des : 'empty';
    let imageNode = null;
    if (typeof image === 'string') {
        imageNode = <img alt={alt} src={image}/>;
    }
    else {
        imageNode = image;
    }
    const prefixCls = 'oak';
    return (<div className={classNames(`${prefixCls}-empty`, {
            [`${prefixCls}-empty-normal`]: image === simpleEmptyImg,
        }, className)} {...restProps}>
            <div className={`${prefixCls}-empty-image`} style={imageStyle}>
                {imageNode}
            </div>
            {des && <div className={`${prefixCls}-empty-description`}>{des}</div>}
            {children && (<div className={`${prefixCls}-empty-footer`}>{children}</div>)}
        </div>);
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
export default Empty;
