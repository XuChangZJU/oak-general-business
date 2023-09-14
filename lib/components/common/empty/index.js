"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
require("./index.less");
var empty_1 = tslib_1.__importDefault(require("./empty"));
var simple_1 = tslib_1.__importDefault(require("./simple"));
var defaultEmptyImg = (0, jsx_runtime_1.jsx)(empty_1.default, {});
var simpleEmptyImg = (0, jsx_runtime_1.jsx)(simple_1.default, {});
var Empty = function (props) {
    var _a;
    var className = props.className, _b = props.image, image = _b === void 0 ? defaultEmptyImg : _b, description = props.description, children = props.children, imageStyle = props.imageStyle, restProps = tslib_1.__rest(props, ["className", "image", "description", "children", "imageStyle"]);
    var des = typeof description !== 'undefined' ? description : '暂无数据';
    var alt = typeof des === 'string' ? des : 'empty';
    var imageNode = null;
    if (typeof image === 'string') {
        imageNode = (0, jsx_runtime_1.jsx)("img", { alt: alt, src: image });
    }
    else {
        imageNode = image;
    }
    var prefixCls = 'oak';
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: (0, classnames_1.default)("".concat(prefixCls, "-empty"), (_a = {},
            _a["".concat(prefixCls, "-empty-normal")] = image === simpleEmptyImg,
            _a), className) }, restProps, { children: [(0, jsx_runtime_1.jsx)("div", { className: "".concat(prefixCls, "-empty-image"), style: imageStyle, children: imageNode }), des && (0, jsx_runtime_1.jsx)("div", { className: "".concat(prefixCls, "-empty-description"), children: des }), children && ((0, jsx_runtime_1.jsx)("div", { className: "".concat(prefixCls, "-empty-footer"), children: children }))] })));
};
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
exports.default = Empty;
