"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var utils_1 = require("oak-frontend-base/lib/utils/utils");
var fail_1 = tslib_1.__importDefault(require("../../../components/common/result/fail"));
var success_1 = tslib_1.__importDefault(require("../../../components/common/result/success"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _a = props.data, error = _a.error, loading = _a.loading;
    var V;
    if (loading) {
        V = ((0, jsx_runtime_1.jsx)(success_1.default, { icon: (0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { className: web_module_less_1.default.brand_icon }), title: "\u767B\u5F55\u4E2D", description: "\u6B63\u5728\u767B\u5F55..\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    else if (error) {
        V = ((0, jsx_runtime_1.jsx)(fail_1.default, tslib_1.__assign({ title: error, description: "\u62B1\u6B49\uFF0C\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u8FDB\u884C\u6392\u67E5\uFF01" }, { children: utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                    WeixinJSBridge.call('closeWindow');
                } }, { children: "\u5173\u95ED" }))) })));
    }
    return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: V }));
}
exports.default = render;
