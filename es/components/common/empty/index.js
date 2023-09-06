import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import './index.less';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
const defaultEmptyImg = _jsx(DefaultEmptyImg, {});
const simpleEmptyImg = _jsx(SimpleEmptyImg, {});
const Empty = (props) => {
    const { className, image = defaultEmptyImg, description, children, imageStyle, ...restProps } = props;
    const des = typeof description !== 'undefined' ? description : '暂无数据';
    const alt = typeof des === 'string' ? des : 'empty';
    let imageNode = null;
    if (typeof image === 'string') {
        imageNode = _jsx("img", { alt: alt, src: image });
    }
    else {
        imageNode = image;
    }
    const prefixCls = 'oak';
    return (_jsxs("div", { className: classNames(`${prefixCls}-empty`, {
            [`${prefixCls}-empty-normal`]: image === simpleEmptyImg,
        }, className), ...restProps, children: [_jsx("div", { className: `${prefixCls}-empty-image`, style: imageStyle, children: imageNode }), des && _jsx("div", { className: `${prefixCls}-empty-description`, children: des }), children && (_jsx("div", { className: `${prefixCls}-empty-footer`, children: children }))] }));
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
export default Empty;
