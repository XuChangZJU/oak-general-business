"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = tslib_1.__importStar(require("react"));
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const icon_1 = tslib_1.__importDefault(require("../../icon"));
function render(props) {
    const { placement = 'bottom', style = {} } = props.data;
    const { printCachedStore, printDebugStore, printRunningTree, resetInitialData, downloadEnv, resetEnv } = props.methods;
    const [visible, setVisible] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", shape: "circle", icon: (0, jsx_runtime_1.jsx)(icon_1.default, { name: "packup" }), style: {
                    position: 'fixed',
                    bottom: 0,
                    right: 'calc(100% / 2 - 16px)',
                    zIndex: 999,
                    width: 32,
                    height: 32,
                    ...style,
                }, onClick: () => {
                    setVisible(true);
                } }), (0, jsx_runtime_1.jsxs)(antd_1.Drawer, { getContainer: false, placement: placement, open: visible, onClose: () => {
                    setVisible(false);
                }, title: "Debug\u63A7\u5236\u53F0", footer: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), rootClassName: web_module_less_1.default.drawer, children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: "application/json", hidden: true, id: "upload", onChange: () => {
                            const file = document.getElementById('upload')
                                .files[0];
                            if (typeof FileReader === undefined) {
                                alert('浏览器版本太老了');
                            }
                            else {
                                const reader = new FileReader();
                                reader.readAsText(file);
                                reader.onload = function () {
                                    try {
                                        const data = JSON.parse(this.result);
                                        resetEnv(data);
                                        window.location.reload();
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                };
                            }
                        } }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { wrap: true, children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u9875\u9762\u7ED3\u6784", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", shape: "circle", onClick: () => printRunningTree(), children: "R" }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "Store\u6570\u636E", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", shape: "circle", onClick: () => printDebugStore(), children: "S" }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u9875\u9762\u7F13\u5B58", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", shape: "circle", onClick: () => printCachedStore(), children: "C" }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u4E0B\u8F7DStore", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", shape: "circle", onClick: () => {
                                        const data = downloadEnv();
                                        const element = document.createElement('a');
                                        element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
                                            encodeURIComponent(JSON.stringify(data)));
                                        element.setAttribute('download', 'data.json');
                                        element.style.display = 'none';
                                        document.body.appendChild(element);
                                        element.click();
                                        document.body.removeChild(element);
                                    }, children: "D" }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u4E0A\u4F20Store", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", shape: "circle", onClick: () => {
                                        const element = document.getElementById('upload');
                                        element.click();
                                    }, children: "U" }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u91CD\u7F6EStore", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", danger: true, shape: "circle", onClick: () => {
                                        const modal = antd_1.Modal.confirm({
                                            title: '重置数据',
                                            content: '重置后，原来的数据不可恢复',
                                            okText: '确定',
                                            cancelText: '取消',
                                            onOk: (e) => {
                                                resetInitialData();
                                                modal.destroy();
                                                window.location.reload();
                                            },
                                            onCancel: (e) => {
                                                modal.destroy();
                                            },
                                        });
                                    }, children: "Reset" }) }), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, { title: "\u67E5\u770BOakIcon", children: (0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", type: "primary", shape: "circle", onClick: () => {
                                        window.open('/icon');
                                    }, children: "Icon" }) })] })] })] }));
}
exports.default = render;
