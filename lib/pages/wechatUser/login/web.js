"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const utils_1 = require("oak-frontend-base/es/utils/utils");
const fail_1 = tslib_1.__importDefault(require("../../../components/common/result/fail"));
const success_1 = tslib_1.__importDefault(require("../../../components/common/result/success"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { error, loading } = props.data;
    let V;
    if (loading) {
        V = ((0, jsx_runtime_1.jsx)(success_1.default, { icon: (0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { className: web_module_less_1.default.brand_icon }), title: "\u767B\u5F55\u4E2D", description: "\u6B63\u5728\u767B\u5F55..\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    else if (error) {
        V = ((0, jsx_runtime_1.jsx)(fail_1.default, { title: error, description: "\u62B1\u6B49\uFF0C\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u8FDB\u884C\u6392\u67E5\uFF01", children: utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                    WeixinJSBridge.call('closeWindow');
                }, children: "\u5173\u95ED" })) }));
    }
    return (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: V });
}
exports.default = render;
