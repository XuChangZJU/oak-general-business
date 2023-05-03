"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("@ant-design/icons");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var success_1 = tslib_1.__importDefault(require("../../../components/common/result/success"));
var fail_1 = tslib_1.__importDefault(require("../../../components/common/result/fail"));
function render(props) {
    var _a = props.data, oakLoading = _a.oakLoading, expired = _a.expired, illegal = _a.illegal, loading = _a.loading;
    var V;
    if (oakLoading || loading) {
        V = ((0, jsx_runtime_1.jsx)(success_1.default, { icon: (0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { className: web_module_less_1.default.brand_icon }), title: "\u52A0\u8F7D\u4E2D", description: "\u6B63\u5728\u83B7\u53D6\u6570\u636E\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    else if (illegal) {
        V = ((0, jsx_runtime_1.jsx)(fail_1.default, { title: "\u4E8C\u7EF4\u7801\u975E\u6CD5", description: "\u62B1\u6B49\uFF0C\u8BE5\u7801\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u626B\u4E8C\u7EF4\u7801" }));
    }
    else if (expired) {
        V = ((0, jsx_runtime_1.jsx)(fail_1.default, { icon: (0, jsx_runtime_1.jsx)(icons_1.WarningOutlined, { className: web_module_less_1.default.icon }), title: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F", description: "\u62B1\u6B49\uFF0C\u8BE5\u7801\u5DF2\u8FC7\u671F" }));
    }
    else {
        V = ((0, jsx_runtime_1.jsx)(success_1.default, { icon: (0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { className: web_module_less_1.default.brand_icon }), title: "\u8DF3\u8F6C\u4E2D", description: "\u6B63\u5728\u8DF3\u8F6C...\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    return (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: V }));
}
exports.default = render;
