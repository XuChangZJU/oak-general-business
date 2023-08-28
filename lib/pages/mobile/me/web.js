"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var icons_1 = require("@ant-design/icons");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    var _this = this;
    var _a = props.data, mobiles = _a.mobiles, allowRemove = _a.allowRemove, tokenMobileId = _a.tokenMobileId;
    var _b = props.methods, goAddMobile = _b.goAddMobile, removeItem = _b.removeItem, recoverItem = _b.recoverItem, execute = _b.execute;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [mobiles && mobiles.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List, tslib_1.__assign({ className: mobile_module_less_1.default.list }, { children: mobiles === null || mobiles === void 0 ? void 0 : mobiles.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, tslib_1.__assign({ prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), extra: allowRemove && tokenMobileId !== ele.id && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var result, err_1;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, antd_mobile_1.Dialog.confirm({
                                                    content: '确认删除吗？删除后无法用此号码登录',
                                                })];
                                            case 1:
                                                result = _a.sent();
                                                if (!result) return [3 /*break*/, 5];
                                                removeItem(ele.id);
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, 4, , 5]);
                                                return [4 /*yield*/, execute()];
                                            case 3:
                                                _a.sent();
                                                return [3 /*break*/, 5];
                                            case 4:
                                                err_1 = _a.sent();
                                                recoverItem(ele.id);
                                                throw err_1;
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); } }, { children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }))) }, { children: ele.mobile }), index)); }) })), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } })] })) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.noData }, { children: (0, jsx_runtime_1.jsx)("span", { children: "\u5C1A\u672A\u7ED1\u5B9A\u624B\u673A\u53F7" }) }))), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ block: true, size: "large", color: "primary", onClick: function () { return goAddMobile(); } }, { children: "\u7ED1\u5B9A" }))] })));
}
exports.default = render;
