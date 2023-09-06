import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import classNames from 'classnames';
import './index.less';
export default memo((props) => {
    const { style, className, column = 4, gutter = 0, list, onChange, imageClassName, textClassName, } = props;
    const prefixCls = 'oak';
    return (_jsx("div", { className: `${prefixCls}-grid`, style: {
            gap: gutter,
        }, children: list?.map((ele, index) => (_jsx("div", { className: classNames(className, `${prefixCls}-grid-item`, {
                [`${prefixCls}-grid-item-column-${column}`]: column,
            }), style: style, onClick: onChange ? (event) => onChange(index, event) : undefined, children: ele.render ? (_jsx(_Fragment, { children: ele.render })) : (_jsxs(_Fragment, { children: [typeof ele.image === 'string' ? (_jsx("img", { className: classNames(`${prefixCls}-grid-item-image`, imageClassName), src: ele.image })) : (ele.image), _jsx("div", { className: `${prefixCls}-grid-item-text`, children: _jsx("div", { className: classNames(`${prefixCls}-grid-item-title`, textClassName), style: {
                                paddingTop: 4,
                            }, children: ele.text }) })] })) }, index))) }));
});
