"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = tslib_1.__importStar(require("react"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
// import OakIcon from '../../icon'
function render(props) {
    var _a = props.data, _b = _a.placement, placement = _b === void 0 ? 'bottom' : _b, _c = _a.style, style = _c === void 0 ? {} : _c;
    var _d = props.methods, printCachedStore = _d.printCachedStore, printDebugStore = _d.printDebugStore, printRunningTree = _d.printRunningTree, resetInitialData = _d.resetInitialData, downloadEnv = _d.downloadEnv, resetEnv = _d.resetEnv;
    var _e = tslib_1.__read((0, react_1.useState)(false), 2), visible = _e[0], setVisible = _e[1];
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", shape: "circle", icon: (0, jsx_runtime_1.jsx)(icons_1.UpOutlined, { style: { fontSize: 12 } }), 
                // icon={<OakIcon type="fas" name="chevron-up" />}
                style: tslib_1.__assign({ position: 'fixed', bottom: 0, right: 'calc(100% / 2 - 16px)', zIndex: 999, width: 32, height: 32 }, style), onClick: function () {
                    setVisible(true);
                } }), (0, jsx_runtime_1.jsxs)(antd_1.Drawer, tslib_1.__assign({ getContainer: false, placement: placement, open: visible, onClose: function () {
                    setVisible(false);
                }, title: "Debug\u63A7\u5236\u53F0", footer: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}), rootStyle: {
                    width: '100vw',
                }, bodyStyle: {
                    width: '100vw',
                } }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: "application/json", hidden: true, id: "upload", onChange: function () {
                            var file = document.getElementById('upload')
                                .files[0];
                            if (typeof FileReader === undefined) {
                                alert('浏览器版本太老了');
                            }
                            else {
                                var reader = new FileReader();
                                reader.readAsText(file);
                                reader.onload = function () {
                                    try {
                                        var data = JSON.parse(this.result);
                                        resetEnv(data);
                                        window.location.reload();
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                };
                            }
                        } }), (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ wrap: true }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: "\u9875\u9762\u7ED3\u6784" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", shape: "circle", onClick: function () { return printRunningTree(); } }, { children: "R" })) })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: "Store\u6570\u636E" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", shape: "circle", onClick: function () { return printDebugStore(); } }, { children: "S" })) })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: "\u9875\u9762\u7F13\u5B58" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", shape: "circle", onClick: function () { return printCachedStore(); } }, { children: "C" })) })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: "\u4E0B\u8F7DStore" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", shape: "circle", onClick: function () {
                                        var data = downloadEnv();
                                        var element = document.createElement('a');
                                        element.setAttribute('href', 'data:text/plain;charset=utf-8,' +
                                            encodeURIComponent(JSON.stringify(data)));
                                        element.setAttribute('download', 'data.json');
                                        element.style.display = 'none';
                                        document.body.appendChild(element);
                                        element.click();
                                        document.body.removeChild(element);
                                    } }, { children: "D" })) })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: "\u4E0A\u4F20Store" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", shape: "circle", onClick: function () {
                                        var element = document.getElementById('upload');
                                        element.click();
                                    } }, { children: "U" })) })), (0, jsx_runtime_1.jsx)(antd_1.Tooltip, tslib_1.__assign({ title: "\u91CD\u7F6EStore" }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ size: "large", type: "primary", danger: true, shape: "circle", onClick: function () {
                                        var modal = antd_1.Modal.confirm({
                                            title: '重置数据',
                                            content: '重置后，原来的数据不可恢复',
                                            okText: '确定',
                                            cancelText: '取消',
                                            onOk: function (e) {
                                                resetInitialData();
                                                modal.destroy();
                                                window.location.reload();
                                            },
                                            onCancel: function (e) {
                                                modal.destroy();
                                            },
                                        });
                                    } }, { children: "Reset" })) }))] }))] }))] }));
}
exports.default = render;
