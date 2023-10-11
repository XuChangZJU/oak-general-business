"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_mobile_1 = require("antd-mobile");
function render(props) {
    const { style, className, onDownload, files = [], disableDownload = false, disablePreview = false, } = props.data;
    const { t } = props.methods;
    const [visible, setVisible] = (0, react_1.useState)(false);
    const imageViewerMultiRef = (0, react_1.useRef)(null);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.Space, { children: files?.map((ele, index) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.Image, { src: ele.thumbUrl, width: 100, height: 100, fit: "contain", onClick: !disablePreview ? () => {
                        setVisible(true);
                        imageViewerMultiRef.current.swipeTo(index);
                    } : undefined }))) }), (0, jsx_runtime_1.jsx)(antd_mobile_1.ImageViewer.Multi, { ref: imageViewerMultiRef, images: files?.map((ele) => ele.url) || [], visible: visible, onClose: () => {
                    setVisible(false);
                } })] }));
}
exports.default = render;
