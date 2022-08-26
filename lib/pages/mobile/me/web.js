"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var tdesign_mobile_react_1 = require("tdesign-mobile-react");
var tdesign_icons_react_1 = require("tdesign-icons-react");
var CustomCellGroup = tdesign_mobile_react_1.CellGroup;
function render() {
    var _this = this;
    var _a = this.state, mobiles = _a.mobiles, confirmDeleteModalVisible = _a.confirmDeleteModalVisible, deleteIdx = _a.deleteIdx;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: "page-body" }, { children: [(0, jsx_runtime_1.jsx)(CustomCellGroup, { children: mobiles === null || mobiles === void 0 ? void 0 : mobiles.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Cell, { title: ele.mobile, onClick: function () {
                        _this.setState({
                            confirmDeleteModalVisible: true,
                            deleteIdx: index,
                        });
                    }, leftIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "mobile" }), rightIcon: (0, jsx_runtime_1.jsx)(tdesign_icons_react_1.Icon, { name: "delete" }) }, index)); }) }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Button, tslib_1.__assign({ size: "large", theme: "primary", block: true, onClick: function () { return _this.goAddMobile(); } }, { children: "\u6DFB\u52A0" })), (0, jsx_runtime_1.jsx)(tdesign_mobile_react_1.Dialog, { visible: confirmDeleteModalVisible, title: "\u786E\u8BA4\u5220\u9664\u624B\u673A\u53F7\u5417\uFF1F", confirmBtn: "\u786E\u5B9A", cancelBtn: "\u53D6\u6D88", content: "\u5220\u9664\u540E\uFF0C\u4E0D\u53EF\u6062\u590D", destroyOnClose: true, onClose: function () {
                    _this.setState({
                        confirmDeleteModalVisible: false,
                        deleteIdx: undefined,
                    });
                }, onConfirm: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    return tslib_1.__generator(this, function (_a) {
                        this.execute('remove', undefined, "".concat(deleteIdx));
                        this.setState({
                            confirmDeleteModalVisible: false,
                            deleteIdx: undefined,
                        });
                        return [2 /*return*/];
                    });
                }); } })] })));
}
exports.default = render;
