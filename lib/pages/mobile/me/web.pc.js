"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var login_1 = tslib_1.__importDefault(require("../../../pages/mobile/login"));
function render(props) {
    var _this = this;
    var _a = props.data, mobiles = _a.mobiles, allowRemove = _a.allowRemove, tokenMobileId = _a.tokenMobileId, _b = _a.showBack, showBack = _b === void 0 ? false : _b;
    var _c = props.methods, goAddMobile = _c.goAddMobile, removeItem = _c.removeItem, recoverItem = _c.recoverItem, execute = _c.execute, sub = _c.sub;
    var _d = tslib_1.__read((0, react_1.useState)(false), 2), open = _d[0], setOpen = _d[1];
    var eventLoggedIn = "user:info:login:".concat(Date.now());
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, tslib_1.__assign({ showBack: showBack, title: "\u6211\u7684\u624B\u673A\u53F7" }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                            setOpen(true);
                        }, style: { marginBottom: 16 } }, { children: "\u7ED1\u5B9A" })), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ xs: 24, sm: 12 }, { children: (0, jsx_runtime_1.jsx)(antd_1.List, tslib_1.__assign({ bordered: true }, { children: mobiles === null || mobiles === void 0 ? void 0 : mobiles.map(function (ele, index) { return ((0, jsx_runtime_1.jsx)(antd_1.List.Item, tslib_1.__assign({ extra: allowRemove &&
                                        tokenMobileId !== ele.id && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: function () {
                                            var modal = antd_1.Modal
                                                .confirm({
                                                title: "\u786E\u8BA4\u5220\u9664\u5417\uFF1F\u5220\u9664\u540E\u65E0\u6CD5\u7528\u6B64\u53F7\u7801\u767B\u5F55",
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    var err_1;
                                                    return tslib_1.__generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                removeItem(ele.id);
                                                                _a.label = 1;
                                                            case 1:
                                                                _a.trys.push([1, 3, , 4]);
                                                                return [4 /*yield*/, execute()];
                                                            case 2:
                                                                _a.sent();
                                                                return [3 /*break*/, 4];
                                                            case 3:
                                                                err_1 = _a.sent();
                                                                recoverItem(ele.id);
                                                                throw err_1;
                                                            case 4:
                                                                modal.destroy();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); },
                                                onCancel: function (e) {
                                                    modal.destroy();
                                                },
                                            });
                                        } }, { children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) }))) }, { children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: ele.mobile }) }), index)); }) })) })) })] })), (0, jsx_runtime_1.jsx)(antd_1.Modal, tslib_1.__assign({ title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: function () {
                    setOpen(false);
                } }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { padding: 16 } }, { children: (0, jsx_runtime_1.jsx)(login_1.default, { callback: function () {
                            setOpen(false);
                        }, oakPath: "$mobile/me-mobile/login", oakAutoUnmount: true }) })) }))] })));
}
exports.default = render;
