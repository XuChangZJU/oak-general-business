"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _this = this;
    var mobiles = props.data.mobiles;
    var _a = props.methods, goAddMobile = _a.goAddMobile, removeItem = _a.removeItem, execute = _a.execute;
    var _b = tslib_1.__read((0, react_1.useState)(undefined), 2), idToRemove = _b[0], setIdToRemove = _b[1];
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.List, tslib_1.__assign({ className: web_module_less_1.default.list, split: true }, { children: mobiles === null || mobiles === void 0 ? void 0 : mobiles.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () { return setIdToRemove(ele.id); } }, { children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) })) }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: ele.mobile }) }), index)); }) })), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, size: "large", type: "primary", onClick: function () { return goAddMobile(); } }, { children: "\u6DFB\u52A0" })), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: !!idToRemove, title: "\u786E\u8BA4\u5220\u9664\u624B\u673A\u53F7\u5417\uFF1F", okText: "\u786E\u5B9A", cancelText: "\u53D6\u6D88", 
                // content="删除后，不可恢复"
                destroyOnClose: true, onCancel: function () { return (0, react_1.useState)(undefined); }, onOk: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, removeItem(idToRemove)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, execute()];
                            case 2:
                                _a.sent();
                                setIdToRemove(undefined);
                                return [2 /*return*/];
                        }
                    });
                }); } })] })));
}
exports.default = render;
