"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = tslib_1.__importDefault(require("react"));
var tdesign_react_1 = require("tdesign-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
// import { saveAs } from 'file-saver';
function render() {
    var _this = this;
    var _a = this.props, _b = _a.placement, placement = _b === void 0 ? 'bottom' : _b, _c = _a.style, style = _c === void 0 ? {} : _c;
    var visible = this.state.visible;
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, { variant: "text", shape: "circle", theme: "primary", icon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.ChevronUpIcon, {}), style: tslib_1.__assign({ position: 'fixed', bottom: 0, right: '45vw' }, style), onClick: function () {
                    _this.setVisible(true);
                } }), (0, jsx_runtime_1.jsxs)(tdesign_react_1.Drawer, tslib_1.__assign({ placement: placement, visible: visible, onClose: function () {
                    _this.setVisible(false);
                }, header: "Debug\u63A7\u5236\u53F0", footer: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}) }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "file", accept: 'application/json', hidden: true, id: "upload", onChange: function () {
                            var that = _this;
                            var file = document.getElementById('upload').files[0];
                            if (typeof FileReader === undefined) {
                                alert('浏览器版本太老了');
                            }
                            else {
                                var reader = new FileReader();
                                reader.readAsText(file);
                                reader.onload = function () {
                                    try {
                                        var data = JSON.parse(this.result);
                                        that.features.localStorage.resetAll(data);
                                        window.location.reload();
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                };
                            }
                        } }), (0, jsx_runtime_1.jsxs)(tdesign_react_1.Space, tslib_1.__assign({ breakLine: true, direction: "horizontal", size: "medium" }, { children: [(0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", shape: "circle", onClick: function () { return _this.printRunningTree(); } }, { children: "R" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", shape: "circle", onClick: function () { return _this.printDebugStore(); } }, { children: "S" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", shape: "circle", onClick: function () { return _this.printCachedStore(); } }, { children: "C" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", shape: "circle", onClick: function () {
                                    var data = _this.features.localStorage.loadAll();
                                    var element = document.createElement('a');
                                    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
                                    element.setAttribute('download', 'data.json');
                                    element.style.display = 'none';
                                    document.body.appendChild(element);
                                    element.click();
                                    document.body.removeChild(element);
                                } }, { children: "D" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "primary", shape: "circle", onClick: function () {
                                    var element = document.getElementById('upload');
                                    element.click();
                                } }, { children: "U" })), (0, jsx_runtime_1.jsx)(tdesign_react_1.Button, tslib_1.__assign({ theme: "warning", shape: "circle", onClick: function () {
                                    var confirmDia = tdesign_react_1.DialogPlugin.confirm({
                                        header: '重置数据',
                                        body: '重置后，原来的数据不可恢复',
                                        confirmBtn: '确定',
                                        cancelBtn: '取消',
                                        onConfirm: function (_a) {
                                            var e = _a.e;
                                            _this.resetInitialData();
                                            confirmDia.hide();
                                            window.location.reload();
                                        },
                                        onClose: function (_a) {
                                            var e = _a.e, trigger = _a.trigger;
                                            confirmDia.hide();
                                        },
                                    });
                                } }, { children: "Reset" }))] }))] }))] }));
}
exports.default = render;
