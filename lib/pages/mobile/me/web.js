"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_mobile_1 = require("antd-mobile");
const icons_1 = require("@ant-design/icons");
const mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
function render(props) {
    const { mobiles, allowRemove, tokenMobileId } = props.data;
    const { goAddMobile, removeItem, recoverItem, execute } = props.methods;
    return ((0, jsx_runtime_1.jsxs)("div", { className: mobile_module_less_1.default.container, children: [mobiles && mobiles.length > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List, { className: mobile_module_less_1.default.list, children: mobiles?.map((ele, index) => ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, { prefix: (0, jsx_runtime_1.jsx)(icons_1.MobileOutlined, {}), extra: allowRemove && tokenMobileId !== ele.id && ((0, jsx_runtime_1.jsx)("div", { onClick: async () => {
                                    const result = await antd_mobile_1.Dialog.confirm({
                                        content: '确认删除吗？删除后无法用此号码登录',
                                    });
                                    if (result) {
                                        removeItem(ele.id);
                                        try {
                                            await execute();
                                        }
                                        catch (err) {
                                            recoverItem(ele.id);
                                            throw err;
                                        }
                                    }
                                }, children: (0, jsx_runtime_1.jsx)(icons_1.DeleteOutlined, {}) })), children: ele.mobile }, index))) }), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } })] })) : ((0, jsx_runtime_1.jsx)("div", { className: mobile_module_less_1.default.noData, children: (0, jsx_runtime_1.jsx)("span", { children: "\u5C1A\u672A\u7ED1\u5B9A\u624B\u673A\u53F7" }) })), (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, { block: true, size: "large", color: "primary", onClick: () => goAddMobile(), children: "\u7ED1\u5B9A" })] }));
}
exports.default = render;
