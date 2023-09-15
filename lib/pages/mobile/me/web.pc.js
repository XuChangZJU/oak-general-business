"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const login_1 = tslib_1.__importDefault(require("../../../pages/mobile/login"));
function render(props) {
    const { mobiles, allowRemove, tokenMobileId, showBack = false } = props.data;
    const { goAddMobile, removeItem, recoverItem, execute, subEvent } = props.methods;
    const [open, setOpen] = (0, react_1.useState)(false);
    const eventLoggedIn = `user:info:login:${Date.now()}`;
    return ((0, jsx_runtime_1.jsxs)(pageHeader_1.default, { showBack: showBack, title: "\u6211\u7684\u624B\u673A\u53F7", children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                            setOpen(true);
                        }, style: { marginBottom: 16 }, children: "\u7ED1\u5B9A" }), (0, jsx_runtime_1.jsx)(antd_1.Row, { children: (0, jsx_runtime_1.jsx)(antd_1.Col, { xs: 24, sm: 12, children: (0, jsx_runtime_1.jsx)(antd_1.List, { bordered: true, children: mobiles?.map((ele, index) => ((0, jsx_runtime_1.jsx)(antd_1.List.Item, { extra: allowRemove &&
                                        tokenMobileId !== ele.id && ((0, jsx_runtime_1.jsx)("div", { onClick: () => {
                                            const modal = antd_1.Modal
                                                .confirm({
                                                title: `确认删除吗？删除后无法用此号码登录`,
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: async (e) => {
                                                    removeItem(ele.id);
                                                    try {
                                                        await execute();
                                                    }
                                                    catch (err) {
                                                        recoverItem(ele.id);
                                                        throw err;
                                                    }
                                                    modal.destroy();
                                                },
                                                onCancel: (e) => {
                                                    modal.destroy();
                                                },
                                            });
                                        }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) })), children: (0, jsx_runtime_1.jsx)(antd_1.List.Item.Meta, { avatar: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), title: ele.mobile }) }, index))) }) }) })] }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: "\u7ED1\u5B9A\u624B\u673A\u53F7", open: open, destroyOnClose: true, footer: null, onCancel: () => {
                    setOpen(false);
                }, children: (0, jsx_runtime_1.jsx)("div", { style: { padding: 16 }, children: (0, jsx_runtime_1.jsx)(login_1.default, { callback: () => {
                            setOpen(false);
                        }, oakPath: "$mobile/me-mobile/login", oakAutoUnmount: true }) }) })] }));
}
exports.default = render;
