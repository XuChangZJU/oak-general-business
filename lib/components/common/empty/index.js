"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
const empty_1 = tslib_1.__importDefault(require("./empty"));
const simple_1 = tslib_1.__importDefault(require("./simple"));
const defaultEmptyImg = (0, jsx_runtime_1.jsx)(empty_1.default, {});
const simpleEmptyImg = (0, jsx_runtime_1.jsx)(simple_1.default, {});
const Empty = (props) => {
    const { className, image = defaultEmptyImg, description, children, imageStyle, ...restProps } = props;
    const des = typeof description !== 'undefined' ? description : '暂无数据';
    const alt = typeof des === 'string' ? des : 'empty';
    let imageNode = null;
    if (typeof image === 'string') {
        imageNode = (0, jsx_runtime_1.jsx)("img", { alt: alt, src: image });
    }
    else {
        imageNode = image;
    }
    const prefixCls = 'oak';
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, classnames_1.default)(`${prefixCls}-empty`, {
            [`${prefixCls}-empty-normal`]: image === simpleEmptyImg,
        }, className), ...restProps, children: [(0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-empty-image`, style: imageStyle, children: imageNode }), des && (0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-empty-description`, children: des }), children && ((0, jsx_runtime_1.jsx)("div", { className: `${prefixCls}-empty-footer`, children: children }))] }));
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
exports.default = Empty;
