"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var LIST_BTN = [
    {
        id: 1,
        label: '个人信息保护政策',
    },
    {
        id: 2,
        label: '隐私摘要政策',
    },
    {
        id: 3,
        label: '个人信息手机清单',
    },
    {
        id: 4,
        label: '应用权限说明',
    },
    {
        id: 5,
        label: '个人信息共享清单',
    },
    // {
    //     id: 6,
    //     label: '注销账号',
    // },
];
function render(props) {
    var data = props.data, methods = props.methods;
    var userId = data.userId;
    var logout = methods.logout, setVisible = methods.setVisible;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_mobile_1.List, tslib_1.__assign({ className: mobile_module_less_1.default.list }, { children: LIST_BTN.map(function (ele) {
                    return ((0, jsx_runtime_1.jsx)(antd_mobile_1.List.Item, tslib_1.__assign({ arrow: true, onClick: function () {
                            setVisible();
                        } }, { children: ele.label })));
                }) })), (0, jsx_runtime_1.jsx)("div", { style: { flex: 1 } }), userId && ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.logoutBox }, { children: (0, jsx_runtime_1.jsx)(antd_mobile_1.Button, tslib_1.__assign({ block: true, 
                    // color="danger"
                    style: {
                        '--background-color': 'var(--oak-color-primary)',
                        '--text-color': 'var(--oak-bg-color-container)',
                    }, onClick: function () {
                        logout();
                    } }, { children: "\u9000\u51FA\u767B\u5F55" })) })))] })));
}
exports.default = render;
