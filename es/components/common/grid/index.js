import React, { memo } from 'react';
import classNames from 'classnames';
import './index.less';
export default memo((props) => {
    const { style, className, column = 4, gutter = 0, list, onChange, imageClassName, textClassName, } = props;
    const prefixCls = 'oak';
    return (<div className={`${prefixCls}-grid`} style={{
            gap: gutter,
        }}>
            {list?.map((ele, index) => (<div key={index} className={classNames(className, `${prefixCls}-grid-item`, {
                [`${prefixCls}-grid-item-column-${column}`]: column,
            })} style={style} onClick={onChange ? (event) => onChange(index, event) : undefined}>
                    {ele.render ? (<>{ele.render}</>) : (<>
                            {typeof ele.image === 'string' ? (<img className={classNames(`${prefixCls}-grid-item-image`, imageClassName)} src={ele.image}/>) : (ele.image)}
                            <div className={`${prefixCls}-grid-item-text`}>
                                <div className={classNames(`${prefixCls}-grid-item-title`, textClassName)} style={{
                    paddingTop: 4,
                }}>
                                    {ele.text}
                                </div>
                            </div>
                        </>)}
                </div>))}
        </div>);
});
