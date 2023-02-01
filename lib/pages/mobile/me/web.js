"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _this = this;
    var _a = props.data, mobiles = _a.mobiles, allowRemove = _a.allowRemove;
    var _b = props.methods, goAddMobile = _b.goAddMobile, removeItem = _b.removeItem, execute = _b.execute;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List, tslib_1.__assign({ className: web_module_less_1.default.list }, { children: mobiles === null || mobiles === void 0 ? void 0 : mobiles.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, tslib_1.__assign({ prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), extra: allowRemove && (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var result;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, antd_mobile_1.Dialog.confirm({
                                            content: '确认删除吗？删除后无法用此号码登录',
                                        })];
                                    case 1:
                                        result = _a.sent();
                                        if (!result) return [3 /*break*/, 3];
                                        removeItem(ele.id);
                                        return [4 /*yield*/, execute()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); } }, { children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) })) }, { children: ele.mobile }), index)); }) })), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ block: true, size: "large", color: "primary", onClick: function () { return goAddMobile(); } }, { children: "\u6DFB\u52A0" }))] })));
}
exports.default = render;
