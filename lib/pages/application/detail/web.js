"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    var _a = props.data, oakId = _a.oakId, config = _a.config, name = _a.name, tabValue = _a.tabValue;
    var _b = props.methods, t = _b.t, navigateBack = _b.navigateBack, onTabClick = _b.onTabClick;
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, tslib_1.__assign({ showBack: true, title: "\u5E94\u7528\u6982\u89C8" }, { children: (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: (0, jsx_runtime_1.jsx)(antd_1.Card, tslib_1.__assign({ title: name, bordered: false }, { children: (0, jsx_runtime_1.jsx)(antd_1.Tabs, { items: [
                        {
                            label: '应用概览',
                            key: 'detail',
                            children: (0, jsx_runtime_1.jsx)("div", { children: "\u8BE6\u60C5" }),
                        },
                    ] }) })) })) })));
}
exports.default = Render;
