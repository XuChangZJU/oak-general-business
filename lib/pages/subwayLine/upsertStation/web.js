"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
function Render(props) {
    const { methods, data, } = props;
    const { t, } = methods;
    const { oakFullpath, oakId, name, openStation, onClose, subwayId, } = data;
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: oakId ? '编辑站点' : '新增站点', open: openStation, destroyOnClose: true, okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", onOk: async () => {
                // if (!subwayId) {
                // methods.update({ subwayId, });
                // }
                methods.execute();
                onClose();
            }, onCancel: () => {
                onClose();
            }, children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { placeholder: "\u8BF7\u8F93\u5165\u7AD9\u70B9\u540D\u79F0", value: name, onChange: ({ target: { value } }) => {
                        methods.update({ name: value });
                    } }) }) }) }));
}
exports.default = Render;
